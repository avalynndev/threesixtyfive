"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppState } from "@/lib/types";
import { COLOR_PRESETS } from "@/lib/types";
import { countries, getFlagEmoji } from "@/data/countries";
import { devices, getDevicesByCategory } from "@/data/devices";
import { buildWallpaperURL } from "@/lib/utils";

interface ConfigPanelProps {
  state: AppState;
  onChange: (patch: Partial<AppState>) => void;
}

function Label({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-2.5 flex items-baseline justify-between">
      <span className="text-sm font-medium text-white">{children}</span>
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
    </div>
  );
}

function Select({
  value,
  onChange,
  className,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 pr-10 text-sm text-white transition-colors focus:border-white focus:outline-none",
          className,
        )}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  className,
}: {
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      className={cn(
        "w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors focus:border-white focus:outline-none",
        className,
      )}
    />
  );
}

export function ConfigPanel({ state, onChange }: ConfigPanelProps) {
  const [copied, setCopied] = useState(false);
  const generatedUrl = buildWallpaperURL(state);
  const devicesByCategory = getDevicesByCategory();

  const today = new Date().toISOString().split("T")[0];

  const typeLabel =
    state.selectedType === "year"
      ? "Year Progress"
      : state.selectedType === "life"
        ? "Life Calendar"
        : state.selectedType === "goal"
          ? "Goal Countdown"
          : "None";

  async function handleCopy() {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="py-6">
      {/* Section header */}
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
        Personalize
      </p>
      <h2 className="mb-8 text-4xl font-bold tracking-tight">Make it yours</h2>

      {/* Selected indicator */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900 px-4 py-2 text-sm">
        <span className="text-neutral-500">Selected:</span>
        <span className="font-medium">{typeLabel}</span>
      </div>

      {/* Country / Location */}
      <div className="mb-6">
        <Label hint="For accurate timezone">Location</Label>
        <Select
          value={state.country ?? ""}
          onChange={(v) => {
            const c = countries.find((c) => c.code === v);
            if (c) onChange({ country: c.code, timezone: c.timezone });
          }}
        >
          <option value="">Select country...</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {getFlagEmoji(c.code)} {c.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Life Calendar options */}
      {state.selectedType === "life" && (
        <div className="mb-6 space-y-4">
          <div>
            <Label hint="Click to open calendar">Date of Birth</Label>
            <Input
              type="date"
              value={state.dob ?? ""}
              onChange={(v) => onChange({ dob: v })}
              max={today}
            />
          </div>
          <div>
            <Label hint="years">Expected Lifespan</Label>
            <Input
              type="number"
              value={state.lifespan}
              onChange={(v) => onChange({ lifespan: parseInt(v) || 80 })}
              min={50}
              max={120}
            />
          </div>
        </div>
      )}

      {/* Goal options */}
      {state.selectedType === "goal" && (
        <div className="mb-6 space-y-4">
          <div>
            <Label>Goal Name</Label>
            <Input
              value={state.goalName}
              onChange={(v) => onChange({ goalName: v || "Goal" })}
              placeholder="Product Launch"
            />
          </div>
          <div>
            <Label hint="When you began">Start Date</Label>
            <Input
              type="date"
              value={state.goalStart ?? ""}
              onChange={(v) => onChange({ goalStart: v })}
              max={today}
            />
          </div>
          <div>
            <Label hint="Click to open calendar">Target Date</Label>
            <Input
              type="date"
              value={state.goalDate ?? ""}
              onChange={(v) => onChange({ goalDate: v })}
              min={today}
            />
          </div>
        </div>
      )}

      {/* Colors */}
      <div className="mb-6">
        <Label>Colors</Label>
        <div className="mb-3 grid grid-cols-2 gap-3">
          {/* Background */}
          <div>
            <p className="mb-1.5 text-xs text-neutral-500">Background</p>
            <div
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 transition-colors hover:border-white/20"
              onClick={() => document.getElementById("bg-color-input")?.click()}
            >
              <input
                id="bg-color-input"
                type="color"
                value={state.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="h-7 w-7 cursor-pointer rounded bg-transparent"
              />
              <span className="font-mono text-xs uppercase text-neutral-400">
                {state.bgColor}
              </span>
            </div>
          </div>
          {/* Accent */}
          <div>
            <p className="mb-1.5 text-xs text-neutral-500">Accent</p>
            <div
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 bg-neutral-950 px-3 py-2 transition-colors hover:border-white/20"
              onClick={() =>
                document.getElementById("accent-color-input")?.click()
              }
            >
              <input
                id="accent-color-input"
                type="color"
                value={state.accentColor}
                onChange={(e) => onChange({ accentColor: e.target.value })}
                className="h-7 w-7 cursor-pointer rounded bg-transparent"
              />
              <span className="font-mono text-xs uppercase text-neutral-400">
                {state.accentColor}
              </span>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.label}
              title={preset.label}
              onClick={() =>
                onChange({ bgColor: preset.bg, accentColor: preset.accent })
              }
              className="flex gap-0.5 rounded-lg border border-white/10 bg-neutral-950 p-2 transition-all hover:border-white/40"
            >
              <span
                className="h-4 w-4 rounded-[3px]"
                style={{
                  background: preset.bg,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <span
                className="h-4 w-4 rounded-[3px]"
                style={{
                  background: preset.accent,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Device */}
      <div className="mb-6">
        <Label hint={`${state.width} × ${state.height}`}>Device</Label>
        <Select
          value={state.selectedDevice?.name ?? ""}
          onChange={(v) => {
            const d = devices.find((d) => d.name === v);
            if (d)
              onChange({
                selectedDevice: d,
                width: d.width,
                height: d.height,
                clockHeight: d.clockHeight,
              });
          }}
        >
          {Object.entries(devicesByCategory).map(([cat, devList]) => (
            <optgroup key={cat} label={cat}>
              {devList.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </div>

      {/* Generated URL */}
      <div className="mt-8 border-t border-white/10 pt-8">
        <Label>Your Wallpaper URL</Label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={generatedUrl ?? "Configure options above…"}
            className="flex-1 rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 font-mono text-xs text-neutral-400 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            disabled={!generatedUrl}
            className={cn(
              "flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-150",
              generatedUrl
                ? "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"
                : "cursor-not-allowed bg-neutral-800 text-neutral-500",
            )}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

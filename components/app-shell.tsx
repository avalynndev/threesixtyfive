"use client";

import { useAppState } from "@/hooks/use-app-state";
import { TypesSection } from "@/components/types-section";
import { CustomizeSection } from "@/components/customize-section";

export function AppShell() {
  const { state, patch, selectType } = useAppState();

  return (
    <>
      <TypesSection selectedType={state.selectedType} onSelect={selectType} />
      <CustomizeSection state={state} onChange={patch} />
    </>
  );
}

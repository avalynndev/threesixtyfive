import type { Device } from "@/lib/types";

export const devices: Device[] = [
  {
    name: "iPhone 17 Pro Max",
    category: "iPhone 17",
    width: 1320,
    height: 2868,
    clockHeight: 0.16,
  },
  {
    name: "iPhone 17 Pro",
    category: "iPhone 17",
    width: 1206,
    height: 2622,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 17",
    category: "iPhone 17",
    width: 1206,
    height: 2622,
    clockHeight: 0.18,
  },
  {
    name: "iPhone Air",
    category: "iPhone 17",
    width: 1260,
    height: 2736,
    clockHeight: 0.17,
  },
  {
    name: "iPhone 16 Pro Max",
    category: "iPhone 16",
    width: 1320,
    height: 2868,
    clockHeight: 0.16,
  },
  {
    name: "iPhone 16 Pro",
    category: "iPhone 16",
    width: 1206,
    height: 2622,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 16 Plus",
    category: "iPhone 16",
    width: 1284,
    height: 2778,
    clockHeight: 0.17,
  },
  {
    name: "iPhone 16",
    category: "iPhone 16",
    width: 1179,
    height: 2556,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 16e",
    category: "iPhone 16",
    width: 1170,
    height: 2532,
    clockHeight: 0.19,
  },
  {
    name: "iPhone 15 Pro Max",
    category: "iPhone 15",
    width: 1290,
    height: 2796,
    clockHeight: 0.16,
  },
  {
    name: "iPhone 15 Pro",
    category: "iPhone 15",
    width: 1179,
    height: 2556,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 15 Plus",
    category: "iPhone 15",
    width: 1284,
    height: 2778,
    clockHeight: 0.17,
  },
  {
    name: "iPhone 15",
    category: "iPhone 15",
    width: 1179,
    height: 2556,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 14 Pro Max",
    category: "iPhone 14",
    width: 1290,
    height: 2796,
    clockHeight: 0.16,
  },
  {
    name: "iPhone 14 Pro",
    category: "iPhone 14",
    width: 1179,
    height: 2556,
    clockHeight: 0.18,
  },
  {
    name: "iPhone 14 Plus",
    category: "iPhone 14",
    width: 1284,
    height: 2778,
    clockHeight: 0.17,
  },
  {
    name: "iPhone 14",
    category: "iPhone 14",
    width: 1170,
    height: 2532,
    clockHeight: 0.18,
  },
  {
    name: "Galaxy S25 Ultra",
    category: "Samsung S25",
    width: 1440,
    height: 3120,
    clockHeight: 0.15,
  },
  {
    name: "Galaxy S25 Edge",
    category: "Samsung S25",
    width: 1440,
    height: 3120,
    clockHeight: 0.15,
  },
  {
    name: "Galaxy S25+",
    category: "Samsung S25",
    width: 1440,
    height: 3120,
    clockHeight: 0.15,
  },
  {
    name: "Galaxy S25",
    category: "Samsung S25",
    width: 1080,
    height: 2340,
    clockHeight: 0.16,
  },
  {
    name: "Galaxy S24 Ultra",
    category: "Samsung S24",
    width: 1440,
    height: 3088,
    clockHeight: 0.15,
  },
  {
    name: "Galaxy S24+",
    category: "Samsung S24",
    width: 1080,
    height: 2340,
    clockHeight: 0.16,
  },
  {
    name: "Galaxy S24",
    category: "Samsung S24",
    width: 1080,
    height: 2340,
    clockHeight: 0.16,
  },
  {
    name: "Pixel 10 Pro XL",
    category: "Google Pixel",
    width: 1344,
    height: 2992,
    clockHeight: 0.15,
  },
  {
    name: "Pixel 10 Pro",
    category: "Google Pixel",
    width: 1344,
    height: 2992,
    clockHeight: 0.15,
  },
  {
    name: "Pixel 10",
    category: "Google Pixel",
    width: 1080,
    height: 2400,
    clockHeight: 0.16,
  },
  {
    name: "Pixel 9 Pro XL",
    category: "Google Pixel",
    width: 1344,
    height: 2992,
    clockHeight: 0.15,
  },
  {
    name: "Pixel 9 Pro",
    category: "Google Pixel",
    width: 1344,
    height: 2992,
    clockHeight: 0.15,
  },
  {
    name: "Pixel 9",
    category: "Google Pixel",
    width: 1080,
    height: 2424,
    clockHeight: 0.16,
  },
  {
    name: "OnePlus 13",
    category: "Android",
    width: 1440,
    height: 3168,
    clockHeight: 0.15,
  },
  {
    name: "OnePlus 12",
    category: "Android",
    width: 1440,
    height: 3168,
    clockHeight: 0.15,
  },
];

export function getDefaultDevice(): Device {
  return devices.find((d) => d.name === "iPhone 17 Pro") ?? devices[0];
}

export function getDevicesByCategory(): Record<string, Device[]> {
  return devices.reduce(
    (acc, device) => {
      if (!acc[device.category]) acc[device.category] = [];
      acc[device.category].push(device);
      return acc;
    },
    {} as Record<string, Device[]>,
  );
}

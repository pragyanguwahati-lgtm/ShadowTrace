"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "@/lib/analytics/utm-tracker";

export default function UTMTracker() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  return null;
}

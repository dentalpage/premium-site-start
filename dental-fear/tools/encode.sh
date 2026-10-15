#!/usr/bin/env bash
# Encode rendered frames → scrub-friendly mp4s + webp posters (settings from scroll-world pipeline.md).
set -euo pipefail
FR="$1"; OUT="${2:-assets}"
mkdir -p "$OUT/vid"
for d in "$FR"/desktop/*/; do n=$(basename "$d")
  ffmpeg -v error -y -framerate 24 -i "$d%04d.png" -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$OUT/vid/$n.mp4"
done
for d in "$FR"/mobile/*/; do n=$(basename "$d")
  ffmpeg -v error -y -framerate 24 -i "$d%04d.png" -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
    -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$OUT/vid/$n-m.mp4"
done
for d in "$FR"/desktop/dive*/; do n=$(basename "$d")
  ffmpeg -v error -y -i "${d}0000.png" -c:v libwebp -quality 82 "$OUT/$n.webp"
  ffmpeg -v error -y -i "$FR/mobile/$n/0000.png" -c:v libwebp -quality 82 "$OUT/$n-m.webp"
done

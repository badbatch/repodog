---
to: scripts/installActivateMise.sh
---
if ! command -v mise >/dev/null 2>&1
then
  curl https://mise.run | sh
fi
mise activate >/dev/null

#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$repo_root/bin" "$HOME/.config/systemd/user" "$HOME/.config/k-assist"
go -C "$repo_root/services/api" build -o "$repo_root/bin/k-assist-api" ./cmd/server
python3 - "$repo_root" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
template = (root / 'infra/systemd/k-assist-api.service').read_text()
target = Path.home() / '.config/systemd/user/k-assist-api.service'
target.write_text(template.replace('@REPO_ROOT@', str(root)))
PY
systemctl --user daemon-reload
systemctl --user enable k-assist-api.service
systemctl --user restart k-assist-api.service

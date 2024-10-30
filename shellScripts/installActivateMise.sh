if ! command -v mise >/dev/null 2>&1
then
  curl https://mise.run | sh
  mise activate >/dev/null
fi
mise install

---
sh: "[[ $(basename \"$PWD\") != <%= name %> ]] && mkdir -p ./<%= name %> && cd ./<%= name %>"
---

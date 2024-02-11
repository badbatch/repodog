---
to: <%= path %>/README.md
from: "<%= overrideTemplate_readme_ejs_t ? `${leafAdditionalTemplatesPath}/readme.ejs.t` : null %>"
---
# <%= name %>

<%= desc %>

[![npm version](https://badge.fury.io/js/%40<%= org %>%2F<%= name %>.svg)](https://badge.fury.io/js/%40<%= org %>%2F<%= name %>)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

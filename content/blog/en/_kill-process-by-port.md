---
title: "Kill a process by port"
description: "Command lines to find and kill a process by port."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: kill-process-by-port
---

# Kill a process by port

```bash
fuser 8888/tcp
```

```bash
fuser -k 8888/tcp
```

```bash
lsof -i:3000
```

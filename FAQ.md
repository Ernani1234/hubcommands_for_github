# FAQ

### The app shows code in the background
Ensure public/index.html does not contain content after </html>. We fixed this by truncating the file.

### Info button does not open modal
The explainForItem function must be available in the script block. Ensure no console ReferenceError.

### Cannot commit: index.lock exists
Remove the lock file and retry: `rm .git/index.lock` (Windows PowerShell: `Remove-Item -Force .git/index.lock`). We also added a root .gitignore to avoid tracking node_modules/dist.

### Executable fails to start
Windows SmartScreen or antivirus may block unsigned executables. Approve the app or run as administrator.
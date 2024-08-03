# Tajweed Quran Pages

All 604 pages from commonly found Hafs An Asim tajweed quran, collected from https://easyquran.com/

In addition to cloning/downloading this repo, you may ineractively view the Hafs mushaf below: 

### Interactive Viewer: https://jahedev.github.io/tajweed-quran-pages

[![Tajweed Mushaf Interactive Viewer](https://i.imgur.com/iWbbqnW.png)](https://jahedev.github.io/tajweed-quran-pages)

## Downloading Other Versions
Pages of other versions can be downloaded directly from their website: https://easyquran.com/en/recite-and-memoeize/

Zip downloads do not work properly on their website, so you can instead use this command in the terminal of macOS/Linux.
```sh
hafs_url="https://easyquran.com/wp-content/uploads/2022/09"
warsh_url="https://easyquran.com/wp-content/uploads/2022/10"


for i in {1..604}; do curl -O "${warsh_url}/${i}-scaled.jpg"; done
```

For Windows (Powershell)
```powershell
$hafs_url = "https://easyquran.com/wp-content/uploads/2022/09"
$warsh_url = "https://easyquran.com/wp-content/uploads/2022/10"

1..604 | ForEach-Object { Invoke-WebRequest -Uri "$warsh_url/$($_)-scaled.jpg" -OutFile "$($_)-scaled.jpg" }
```





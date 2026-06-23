$base = "C:\Users\Udhaya08\.gemini\antigravity-ide\brain\f770b454-e835-4eaf-bd96-867b460140ad"
$dest = "public\assets\blogs"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item "$base\media__1781458968184.jpg" "$dest\blog_skin_analysis.jpg" -Force
Copy-Item "$base\media__1781458976147.jpg" "$dest\blog_dental_smile.jpg" -Force
Copy-Item "$base\media__1781458984016.jpg" "$dest\blog_botox_fillers.jpg" -Force
Write-Host "Copied!"
Get-ChildItem $dest | Select-Object Name, Length

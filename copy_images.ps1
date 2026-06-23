New-Item -ItemType Directory -Force -Path "public\assets\transformations" | Out-Null
$base = "C:\Users\Udhaya08\.gemini\antigravity-ide\brain\f770b454-e835-4eaf-bd96-867b460140ad"
$dest = "public\assets\transformations"
Copy-Item "$base\transform_skin_brightening_1781457453088.png" "$dest\transform_skin.png" -Force
Copy-Item "$base\transform_hair_prp_v2_1781457491971.png" "$dest\transform_hair.png" -Force
Copy-Item "$base\transform_dental_man_1781457467873.png" "$dest\transform_dental_man.png" -Force
Copy-Item "$base\transform_dental_woman1_1781457503557.png" "$dest\transform_dental_w1.png" -Force
Copy-Item "$base\transform_dental_woman2_1781457516174.png" "$dest\transform_dental_w2.png" -Force
Copy-Item "$base\media__1781457264254.jpg" "$dest\upload_skin.jpg" -Force
Copy-Item "$base\media__1781457270168.jpg" "$dest\upload_hair.jpg" -Force
Copy-Item "$base\media__1781457278027.jpg" "$dest\upload_dental_man.jpg" -Force
Copy-Item "$base\media__1781457284790.jpg" "$dest\upload_dental_w1.jpg" -Force
Copy-Item "$base\media__1781457299841.jpg" "$dest\upload_dental_w2.jpg" -Force
Write-Host "All 10 images copied successfully"
Get-ChildItem "$dest" | Select-Object Name, Length

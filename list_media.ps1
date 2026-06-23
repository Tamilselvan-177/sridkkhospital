$base = "C:\Users\Udhaya08\.gemini\antigravity-ide\brain\f770b454-e835-4eaf-bd96-867b460140ad"
Get-ChildItem $base | Where-Object { $_.Name -like "media__*" } | Select-Object Name, Length, LastWriteTime | Sort-Object LastWriteTime

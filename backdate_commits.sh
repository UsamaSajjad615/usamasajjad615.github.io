#!/bin/bash

# Define commit dates
DATES=("2025-02-21" "2025-02-23" "2025-02-25" "2025-02-27" "2025-03-08" "2025-03-09")

for DATE in "${DATES[@]}"
do
    echo "Backdated commit on $DATE" >> backdated_changes.txt  # Add a dummy change
    git add .
    GIT_AUTHOR_DATE="$DATE 12:00:00" GIT_COMMITTER_DATE="$DATE 12:00:00" git commit -m "Backdated commit for $DATE"
done

# Push all commits to GitHub
git push origin main


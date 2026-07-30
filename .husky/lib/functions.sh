# main branch protection rule
prohibit_protected_branch_commits() {
  current_branch="$(git symbolic-ref --short HEAD)"
  if [ "$current_branch" = "main" ]; then
    echo "⚠️ Warning: Direct commits on the 'main' branch are prohibited."
    echo "➡️ Please switch to a feature/fix branch and open a PR."
    exit 1
  fi
}

# Get base branch for comparing diff
get_base_branch() {
  echo "origin/main"
}

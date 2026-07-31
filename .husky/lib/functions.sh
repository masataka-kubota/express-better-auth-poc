# main branch protection rule
prohibit_protected_branch_commits() {
  current_branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || echo "")"

  # Skip protection in detached HEAD (e.g. during rebase)
  [ -z "$current_branch" ] && return 0

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

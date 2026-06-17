# gh CLI Advanced Reference

## Codespaces

```bash
gh codespace list
gh codespace create --repo owner/repo
gh codespace ssh [--codespace name]
gh codespace stop [--codespace name]
gh codespace delete [--codespace name]
gh codespace ports [--codespace name]    # forward ports
```

## Projects (GitHub Projects v2)

```bash
gh project list [--owner user]
gh project view [number] --owner user
gh project create --title "Sprint 1" --owner user
gh project item-list [number] --owner user
gh project item-add [number] --owner user --url <issue-or-pr-url>
gh project close [number] --owner user
```

## Labels

```bash
gh label list
gh label create "bug" --color CC0000 --description "Something isn't working"
gh label edit "bug" --name "confirmed-bug"
gh label delete "bug"
gh label clone owner/repo           # copy labels from another repo
```

## Milestones (via API)

```bash
gh api /repos/{owner}/{repo}/milestones
gh api /repos/{owner}/{repo}/milestones \
  --method POST \
  -f title="v1.0" \
  -f due_on="2025-12-31T00:00:00Z"
```

## Environment & Secrets

```bash
# Repository secrets
gh secret list
gh secret set MY_SECRET --body "value"
gh secret set MY_SECRET < secret.txt
gh secret delete MY_SECRET

# Environment secrets
gh secret list --env production
gh secret set MY_SECRET --env production --body "value"

# Variables (non-secret)
gh variable list
gh variable set MY_VAR --body "value"
gh variable delete MY_VAR
```

## SSH Keys & GPG Keys

```bash
gh ssh-key list
gh ssh-key add ~/.ssh/id_ed25519.pub --title "My laptop"
gh ssh-key delete [id]

gh gpg-key list
gh gpg-key add key.gpg
gh gpg-key delete [id]
```

## Notifications

```bash
gh api /notifications | gh json
gh api /notifications --method PATCH -f read=true    # mark all as read
```

## Pagination & Large Results

```bash
# Paginate through all results
gh pr list --state closed --limit 1000 --json number,title
gh api --paginate /repos/{owner}/{repo}/issues

# Process with jq
gh pr list --json number,title,author --jq '.[] | "\(.number): \(.title) by \(.author.login)"'
```

## Enterprise GitHub

```bash
# Set hostname for GHE
gh config set -h github.mycompany.com oauth_token TOKEN

# Use with GHE
GH_HOST=github.mycompany.com gh repo list
```

## Config

```bash
gh config list
gh config get editor
gh config set editor "code --wait"    # use VS Code
gh config set git_protocol ssh        # or https
gh config set prompt enabled
gh config set pager "less -F"
```

## Aliases

```bash
gh alias list
gh alias set prs 'pr list --author @me'    # custom alias
gh alias delete prs
```

Usage: `gh prs` → runs `gh pr list --author @me`

## Useful One-liners

```bash
# Open current repo in browser
gh repo view --web

# List all open PRs with CI status
gh pr list --json number,title,statusCheckRollup

# Get the URL of a PR by branch name
gh pr view --json url --jq '.url'

# Download a release asset
gh release download v1.0.0 --pattern "*.zip"

# Re-run only failed jobs
gh run rerun --failed-only

# Check who has access to a repo
gh api /repos/{owner}/{repo}/collaborators | gh json

# Get current user login
gh api /user --jq '.login'

# List repos with topics
gh repo list --json name,repositoryTopics --jq '.[] | "\(.name): \(.repositoryTopics | map(.topic.name) | join(", "))"'
```

## JSON Fields Reference

Common fields available with `--json`:

**PR**: `number, title, body, state, author, assignees, labels, milestone, baseRefName, headRefName, isDraft, mergeable, reviewDecision, statusCheckRollup, url, createdAt, updatedAt, mergedAt`

**Issue**: `number, title, body, state, author, assignees, labels, milestone, comments, url, createdAt, updatedAt, closedAt`

**Run**: `databaseId, name, status, conclusion, workflowName, headBranch, event, url, createdAt, updatedAt`

**Repo**: `name, description, url, sshUrl, isPrivate, isFork, stargazerCount, forkCount, primaryLanguage, topics, licenseInfo`

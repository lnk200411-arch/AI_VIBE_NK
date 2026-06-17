---
name: gh-cli
description: Execute GitHub CLI (gh) commands to manage repositories, issues, pull requests, releases, workflows, and all GitHub operations. Use this skill whenever the user wants to interact with GitHub — creating PRs, listing issues, checking CI status, managing releases, cloning repos, forking, reviewing code, commenting, merging, or any other GitHub-related task. Trigger even when the user says things like "check my PR", "make an issue", "see the CI", "push to GitHub", "what's failing in actions", "create a release", or describes a GitHub action without mentioning gh explicitly. This skill is the primary way to do anything GitHub-related from the terminal.
---

# GitHub CLI (gh) Skill

You have access to the `gh` CLI tool (GitHub CLI). Use it to interact with GitHub directly from the terminal — no browser needed.

## Core Philosophy

The gh CLI is a first-class GitHub client. Prefer it over raw `git` commands for anything GitHub-specific (PRs, issues, releases, Actions). Combine `gh` and `git` as needed — they complement each other.

When the user asks about GitHub, think: "which `gh` command does this map to?" Then run it. Don't ask for confirmation on read-only commands (list, view, status). For write actions (create, merge, delete, push), confirm once if the scope is significant, then proceed.

## Authentication

```bash
gh auth status          # check if logged in
gh auth login           # interactive login (OAuth or token)
gh auth token           # print current token
```

If `gh auth status` shows unauthenticated, ask the user to run `gh auth login` themselves (it's interactive).

## Repository Operations

```bash
gh repo create [name] --public/--private --clone
gh repo clone owner/repo
gh repo fork owner/repo --clone
gh repo view [owner/repo]          # show repo info
gh repo list [owner]               # list repos
gh repo delete owner/repo          # delete (requires confirmation)
gh repo rename new-name
gh repo archive owner/repo
gh repo edit --description "..." --homepage "..."
```

## Pull Requests

```bash
gh pr list [--state open|closed|merged] [--author @me] [--label bug]
gh pr view [number|branch]         # show PR details
gh pr create --title "..." --body "..." --base main --draft
gh pr create --fill                # auto-fill from commits
gh pr checkout [number]            # switch to PR branch
gh pr merge [number] --merge/--squash/--rebase --delete-branch
gh pr close [number]
gh pr reopen [number]
gh pr review [number] --approve/--request-changes/--comment --body "..."
gh pr comment [number] --body "..."
gh pr diff [number]
gh pr checks [number]              # show CI status for a PR
gh pr edit [number] --title "..." --add-label bug --add-reviewer user
gh pr ready [number]               # mark draft PR as ready
```

## Issues

```bash
gh issue list [--state open|closed|all] [--label bug] [--assignee @me]
gh issue view [number]
gh issue create --title "..." --body "..." --label bug --assignee user
gh issue close [number] --reason "completed|not planned"
gh issue reopen [number]
gh issue comment [number] --body "..."
gh issue edit [number] --title "..." --add-label bug
gh issue pin [number]
gh issue transfer [number] owner/repo
```

## GitHub Actions / Workflows

```bash
gh workflow list
gh workflow view [name|id]
gh workflow run [name] [--field key=value]   # trigger manually
gh workflow enable/disable [name]

gh run list [--workflow name] [--status failure|success|in_progress]
gh run view [run-id]               # show run details + logs
gh run watch [run-id]              # stream run in real time
gh run rerun [run-id] [--failed-only]
gh run cancel [run-id]
gh run download [run-id]           # download artifacts
```

## Releases

```bash
gh release list
gh release view [tag]
gh release create [tag] --title "..." --notes "..." [files...]
gh release create [tag] --generate-notes      # auto-generate from PRs
gh release edit [tag] --title "..." --draft/--prerelease
gh release delete [tag]
gh release upload [tag] [files...]
gh release download [tag]
```

## Gists

```bash
gh gist list
gh gist view [id]
gh gist create [files...] --public --desc "..."
gh gist edit [id]
gh gist clone [id]
gh gist delete [id]
```

## Search

```bash
gh search repos "query" --language python --stars ">100"
gh search issues "query" --repo owner/repo --state open
gh search prs "query" --review-requested @me
gh search commits "query" --repo owner/repo
```

## API (Advanced)

For anything not covered by dedicated commands:

```bash
gh api /repos/{owner}/{repo}
gh api /repos/{owner}/{repo}/pulls --jq '.[].title'
gh api graphql -f query='{ viewer { login } }'
```

Use `--jq` to filter JSON output with jq syntax. Use `--paginate` for paginated responses.

## Output Tips

- Add `--json field1,field2` to most commands to get structured JSON output
- Add `--jq '.[] | .title'` to filter specific fields
- Add `--limit N` to most list commands to control result count
- Use `-w` (web) flag to open in browser: `gh issue view 42 -w`

## Common Patterns

**Check what's assigned to me:**
```bash
gh issue list --assignee @me
gh pr list --assignee @me
```

**Find failing CI on current branch:**
```bash
gh run list --branch $(git branch --show-current) --status failure
```

**Create PR from current branch:**
```bash
gh pr create --fill --web   # opens browser to edit before submitting
```

**Watch a running workflow:**
```bash
gh run watch   # watches the most recent run
```

**View PR diff and approve:**
```bash
gh pr diff 42
gh pr review 42 --approve
```

## Error Handling

- `gh: command not found` → gh is not installed. Tell the user to install it from https://cli.github.com
- `not authenticated` → run `gh auth login`
- `HTTP 404` → repo/resource doesn't exist or user lacks access
- `HTTP 422` → validation error, check the command arguments
- For rate limiting errors, wait and retry or use a token with `gh auth login --with-token`

## References

See `references/advanced.md` for less common commands, pagination patterns, and enterprise GitHub usage.

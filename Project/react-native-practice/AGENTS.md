# Expo

Before writing or modifying Expo-related code:

- Check the Expo SDK version used by this project.
- Use documentation matching the project's installed Expo SDK version.
- Do not assume the project uses the latest Expo version.

# React Native Practice Project

## Project Purpose

This is my React Native learning project.

The code comes from classroom exercises and personal practice.
The main goal is learning, not building a production application.

## General Rules

- Use TypeScript.
- Prefer functional React Native components.
- Follow the existing project structure.
- Keep solutions simple and appropriate for a learning project.
- Do not over-engineer simple exercises.
- Do not modify unrelated files.

## Code Review

When reviewing new classroom code, check:

1. Incorrect import paths.
2. Incorrect file paths.
3. TypeScript errors.
4. React Native API usage.
5. Unnecessary duplicated code.
6. DRY violations when duplication is meaningful.
7. Basic SOLID principles when appropriate.
8. Code readability.
9. Formatting and consistency.
10. Potential runtime errors.

Do not blindly rewrite working classroom code.
Preserve the original learning purpose.

## Review Mode

When I ask for a code review:

- Do not modify files.
- Inspect the relevant files first.
- Report problems before making changes.
- Explain why each problem matters.
- Separate errors from optional improvements.

## Fix Mode

Only modify files when I explicitly ask you to fix the problems.

When fixing:

- Make the smallest reasonable changes.
- Preserve existing behavior.
- Do not refactor unrelated code.
- Explain important changes.

## Verification

After modifying code:

- Check TypeScript errors.
- Check imports and file paths.
- Run available lint/type-check commands.
- Run the application when appropriate.
- Report what was checked and any remaining problems.

## Git

Do not automatically commit or push changes.

When I ask for a commit:

1. Check the changes.
2. Summarize what changed.
3. Suggest a commit message.
4. Wait for my confirmation before committing.

Never push to a remote repository unless I explicitly ask.
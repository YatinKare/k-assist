# Contributor guidance

- Use pnpm for JavaScript tooling and Go for the API.
- Run `pnpm check` before committing. Build the marketing site with `pnpm build:marketing` and the API with `pnpm build:api`; run the API with `pnpm dev:api`.
- Generate the mobile native projects from the Expo configuration. Keep generated `apps/mobile/ios` and `apps/mobile/android` directories out of Git.
- Verify mobile changes on both iOS and Android.
- Keep secrets in ignored environment files or private user configuration. Use machine-neutral values in committed templates and documentation.
- Keep the public README focused on the project. Local environment instructions belong in ignored `docs/local/WORKSPACE.md`; read that file when present.
- Keep `notes.md` ignored and append short, completed milestone bullets only.
- Use validated product claims and business terms in customer-facing copy.

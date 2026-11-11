# Ahmed Gamal — Data Analyst Portfolio

A lightweight static portfolio built with HTML, CSS, and vanilla JavaScript. No backend, database, paid hosting, or build step is required.

## Preview locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Start a local static server (recommended): install the free VS Code **Live Server** extension, right-click `index.html`, then choose **Open with Live Server**.
4. Do not open `index.html` directly with `file://` because browsers may block `fetch()` for `data/projects.json`.

## Publish with GitHub Pages
1. Sign in at https://github.com and create a new public repository named `ahmedgamy212.github.io` (or any repository name).
2. Upload the contents of this folder (the `index.html` must be at the repository root).
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for the deployment to finish. For a user-site repository the address is `https://ahmedgamy212.github.io/`; for a project repository it is `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
7. Open the published URL and test it on desktop and mobile.

## Add / edit / remove projects
All project cards are generated from `data/projects.json`.
- Add: copy one complete project object, give it a unique `id`, fill the fields, and paste it inside the JSON array.
- Edit: change the relevant field.
- Remove: delete that project's complete object from the array.
- Keep commas between objects correct. JSON does not allow comments or trailing commas.
- Use relative paths for files inside this repository, e.g. `files/projects/olist-report.pdf`.

Each project supports:
`id`, `title`, `category`, `status`, `featured`, `summary`, `problem`, `dataset`, `tools`, `methodology`, `findings`, `cover`, `screenshots`, `pbix`, `pdf`, `interactive`, `github`, `datasetUrl`, `notes`.

Example project object:
```json
{
  "id": "new-project",
  "title": "New Project",
  "category": "Business Intelligence",
  "status": "Project",
  "featured": false,
  "summary": "One-sentence summary.",
  "problem": "Business question.",
  "dataset": "Dataset name, source, and license.",
  "tools": ["Power BI", "SQL"],
  "methodology": ["Cleaning", "Analysis", "Dashboard"],
  "findings": ["Verified finding one."],
  "cover": "assets/projects/new-project-cover.png",
  "screenshots": ["assets/projects/new-project-page-1.png"],
  "pbix": "files/projects/new-project.pbix",
  "pdf": "files/projects/new-project.pdf",
  "interactive": "",
  "github": "https://github.com/USERNAME/REPOSITORY",
  "datasetUrl": "",
  "notes": ""
}
```

## Add PBIX, PDF, and screenshots
1. Put files in `files/projects/` and images in `assets/projects/`.
2. Add the exact relative path to the project's JSON object:
   - PBIX: `"pbix": "files/projects/my-report.pbix"`
   - PDF: `"pdf": "files/projects/my-report.pdf"`
   - Preview image: `"cover": "assets/projects/my-report-cover.png"`
3. For multiple screenshots, list them in `screenshots`. The current project detail layout uses the cover image as its main preview; the screenshots array is reserved for a future gallery enhancement.
4. Commit/upload the updated files and wait for GitHub Pages to redeploy.

## Add an interactive Power BI report
If Microsoft Power BI Publish to web is available for your report:
1. Confirm the data is safe for unrestricted public access.
2. In Power BI Service, use **File → Embed report → Publish to web (public)**.
3. Copy the public URL and paste it into the project's `"interactive"` field.
4. This site will show an **Interactive report** link on the card and a link in project details.
Do not use Publish to web for private, confidential, or sensitive datasets. Public embedding exposes report data to anyone on the internet. Publish to web availability is controlled by your Power BI tenant administrator and is not guaranteed for personal accounts.

The site intentionally opens the report in a new tab rather than embedding a third-party iframe automatically. This avoids broken embeds and gives you a place to use a verified public report URL. An iframe can be added later if needed.

## Certificates and contact
Certificate titles are included in `index.html`. Add certificate verification links when you have the exact public URLs. Add your professional email by replacing the email placeholder in `index.html`. No email or phone number has been invented.

## Free services and limitations
- GitHub Pages: free static hosting for a public repository.
- GitHub repository: source control and file storage within GitHub's terms and limits.
- Google Fonts: optional remote fonts; system sans-serif fallbacks are defined.
- No database or backend is used.

GitHub Pages published sites have a 1 GB published-site limit and a soft bandwidth limit of 100 GB/month. GitHub recommends keeping source repositories within 1 GB. Large binary files such as PBIX files are better kept outside the website repository when they are large; GitHub blocks ordinary files larger than 100 MiB. For larger deliverables, use GitHub Releases or a reputable external file host, and link to the file. Always test downloads after publishing.

## Power BI compatibility summary
- A `.pbix` file is a Power BI Desktop project file; browsers and GitHub Pages do not execute it.
- Power BI Publish to web can provide interactive reports without requiring visitors to sign in, but the tenant must allow it and the report becomes public, including underlying model data.
- Power BI Embedded production requires paid capacity; trial embed tokens are for development/testing only.
- Power BI Report Server is a licensed server product and requires an eligible SQL Server or Fabric capacity entitlement.
- There is no supported, permanent, free public hosting method that runs arbitrary original PBIX reports interactively on GitHub Pages without a Power BI service/capacity arrangement.

## Before publishing checklist
- Replace project placeholder findings with verified results.
- Add PBIX/PDF/screenshots only when the files are ready and shareable.
- Add exact repository and dashboard URLs; do not link to a generic profile as if it were a project repository.
- Add your email address.
- Check that dataset licenses permit redistribution.
- Check every download link from the deployed site.
- Remember: a public GitHub repository and public website expose all committed files. Never upload confidential data or credentials.

// Configuration for changelog source
export const CHANGELOG_CONFIG = {
  // For now using the public repo URL, change this to your actual changelog when repo is public
  url: "https://raw.githubusercontent.com/SujoyGhosh-scott/form-fields-checker/refs/heads/main/README.md",
  
  // When your treecharts repo becomes public, replace with:
  // url: "https://raw.githubusercontent.com/SujoyGhosh-scott/treecharts-monorepo/refs/heads/main/CHANGELOG.md",
  
  // Cache duration in seconds (1 hour = 3600 seconds)
  revalidateInterval: 3600,
};

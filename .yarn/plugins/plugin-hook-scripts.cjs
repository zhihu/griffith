module.exports = {
  name: `plugin-hook-scripts`,
  factory: (require) => {
    /** @type {import('@yarnpkg/core')} */
    const {scriptUtils} = require('@yarnpkg/core')
    return {
      hooks: {
        async afterAllInstalled(
          /** @type {import('@yarnpkg/core').Project} */ project
        ) {
          const script = 'yarn:afterAllInstalled'
          const locator = project.topLevelWorkspace.anchoredLocator
          if (await scriptUtils.hasPackageScript(locator, script, {project})) {
            await scriptUtils.executePackageScript(locator, script, [], {
              project,
            })
          }
        },
      },
    }
  },
}

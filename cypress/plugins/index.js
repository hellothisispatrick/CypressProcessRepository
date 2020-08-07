// ***********************************************************
// This file plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// @Author: videvaraj@deloitte.com.au
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changes)



const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('cypress','config', `${file}.json`)
  console.log("Path of the environment file is : "+pathToConfigFile);

  return fs.readJson(pathToConfigFile)

}

// plugins file

  module.exports = (on, config) => {
  // accept a configFile value or use development by default
    const file = config.env.configFile || 'development'   
    console.log("Config File name is : ",file);

    return getConfigurationByFile(file)

}





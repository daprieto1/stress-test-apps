module.exports = {
    "executeTestCommand": "cd ${body.testProjectPath} && gradle.bat gatling-${body.testPath}",
    "updateRepositoryCommand": "cd ${body.testProjectPath} && git checkout -- . && git pull origin master",
    "folderSeparatorCharacter": "\\"
};
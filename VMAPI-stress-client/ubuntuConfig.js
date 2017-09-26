module.exports = {
    executeTestCommand: 'cd ${body.testProjectPath} && ./gradlew gatling-${body.testPath}',
    updateRepositoryCommand: 'cd ${body.testProjectPath} && git checkout -- . && git pull origin master && sudo chmod 777 gradlew',
    folderSeparatorCharacter: '/',    
};
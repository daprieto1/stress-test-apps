sudo apt-get update
sudo apt-get -y install apache2
sudo ufw allow 'Apache Full'
sudo ufw allow 'OpenSSH'
sudo ufw allow ssh
sudo ufw allow 22/tcp
sudo ufw enable

sudo apt-get update
sudo apt-get -y install default-jdk

sudo apt-get update
sudo apt-get -y install build-essential libssl-dev
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile
source ~/.bashrc
nvm install 7.7.4
nvm use 7.7.4
npm install --global gulp
npm install --global pm2
npm i --global yarn

cd ~
git clone https://bizagidev.visualstudio.com/DefaultCollection/ToolsAndLibs/_git/RNF

cd ~
git clone https://github.com/daprieto1/stress-test-apps.git
pm2 start /home/bizadmin/stress-test-apps/VMAPI-stress-client/app.js --name="VMAPI-stress-client"

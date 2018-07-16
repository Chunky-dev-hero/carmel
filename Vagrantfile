Vagrant.configure("2") do |config|
  config.vm.box = "carmel/hobbiton"
  config.vm.define "carmel-hobbiton"
  config.ssh.username = "carmel"
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder ".", "/home/carmel/carmel"
  config.vm.box_check_update = true
  config.vm.network "forwarded_port", guest: 8082, host: 18082, guest_ip: "0.0.0.0", host_ip: "127.0.0.1"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "2048"
    vb.name = "carmel-hobbiton"
  end
end

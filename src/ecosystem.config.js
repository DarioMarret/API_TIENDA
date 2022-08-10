module.exports = {
  apps: [{
    name: "api_tienda",
    script: "./index.js",
    watch: true,
    max_memory_restart: '1000M',
    exec_mode: 'cluster',
    instances: 2,
    cron_restart: "59 00 * * *",
    env: {
      NODE_ENV: "production",
      PORT: "3000",
      HOST: "0.0.0.0",
      BASIC_USERNAME: "admin",
      BASIC_PASSWORD: "admin",
      token_mikrowisp: "ejdGNmVseFZtd1NIczE5eTBhQy9xZz09",
      token_tienda: "",
      mikrowisp: "http://45.224.96.50/api/v1/",
      endpoitcedula: "https://turnos.manta.gob.ec/consultacedula/",
      endpoitpre_registro: "http://45.224.96.50/api/v1/ListInstall"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}
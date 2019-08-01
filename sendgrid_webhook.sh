#Ghetto script to listen for localtunnel crashes

function localtunnel {
  lt -s asvmdslkoui132 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
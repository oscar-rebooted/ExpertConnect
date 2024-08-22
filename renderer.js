function openTab(evt, networkName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(networkName).style.display = "block";
    evt.currentTarget.className += " active";
}

async function loadNetworkContent(network) {
    const profiles = await window.electronAPI.fetchExperts(network);
    const container = document.getElementById(`${network}-content`);
    container.innerHTML = profiles.map(profile => `
        <div class="profile">
            <h4>${profile.name}</h4>
            <p>Expertise: ${profile.expertise}</p>
            <p>Contact: <a href="mailto:${profile.contact}">${profile.contact}</a></p>
        </div>
    `).join('');
}

document.querySelector('.tab[onclick="openTab(event, \'network1\')"]').addEventListener('click', () => loadNetworkContent('network1'));
document.querySelector('.tab[onclick="openTab(event, \'network2\')"]').addEventListener('click', () => loadNetworkContent('network2'));

document.querySelector('.tab').click();

document.getElementById('refreshButton').addEventListener('click', async () => {
    const networks = ['network1', 'network2'];
    for (const network of networks) {
        await loadNetworkContent(network);
    }
});

document.getElementById('updateIntervalButton').addEventListener('click', () => {
    const intervalHours = document.getElementById('interval').value;
    window.electronAPI.updateInterval(intervalHours * 3600000);
});

window.electronAPI.onIntervalUpdated((event, message) => {
    console.log(message);
});

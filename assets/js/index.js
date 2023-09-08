const payload = {
    secret: "onlyforgdscajce",
}

const JSONpayload = JSON.stringify(payload)

const urlLeaderboard = 'https://shy-fawn-fatigues.cyclic.app/leaderboard';
const urlGroup = 'https://shy-fawn-fatigues.cyclic.app/group-scores';
const individualData = []
const groupData = []


const rankingsBody = document.querySelector("#rankings > tbody");

function loadRankings () {
    const request = new XMLHttpRequest();

    request.open("post", urlLeaderboard);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const requestBody = JSON.stringify({ secret: "onlyforgdscajce" });
    
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            console.log(json);
            populateRankings(json);
        } catch (e) {
            console.warn("Could not load Player Rankings! :(", e);
        }
    };

    request.send(requestBody);
}


function populateRankings(json) {
    json.forEach((player, playerIndex) => {
        const tr = document.createElement("tr");

        const properties = ['index', 'name', 'email', 'group', 'score'];

        properties.forEach((property, propertyIndex) => {
            const td = document.createElement("td");
            if (property === 'index') {
                td.textContent = playerIndex + 1;
            }else{
                td.textContent = (player[property] !== undefined && player[property] !== null) ? player[property] : '-';
            }
            tr.appendChild(td);
        });

        rankingsBody.appendChild(tr);
    });
}


document.addEventListener("DOMContentLoaded", () => { loadRankings (); });

function performSearch() {
    var value = document.getElementById('search-leaderboard').value;

    $("table").find("tr").each(function(index) {
        if (index === 0) return;

        var if_td_has = false;
        $(this).find('td').each(function () {
            if_td_has = if_td_has || $(this).text().indexOf(value) !== -1;
        });

        $(this).toggle(if_td_has);
    });
}

$("#search-leaderboard").keyup(performSearch);

document.getElementById('clear-search').addEventListener('click', function() {
    document.getElementById('search-leaderboard').value = '';
    performSearch();
});



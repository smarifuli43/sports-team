document.getElementById('button-addon2').addEventListener('click', async () => {
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  inputField.value = '';
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayTeams(data.teams);
  } catch {}
});

// display team
const displayTeams = (teams) => {
  const teamContainer = document.getElementById('team-container');
  teamContainer.textContent = '';
  teams.forEach((team) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.style.cursor = 'pointer';
    // console.log(team);
    div.innerHTML = `
    <div onclick="loadDetails(${team.idTeam})">
    <img src="${team.strTeamBadge}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3 class="card-title text-center">
              ${team.strTeam}
            </h3>
          </div>
          </div>
    `;
    teamContainer.appendChild(div);
  });
};

// load team details by id
const loadDetails = async (teamId) => {
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.teams[0]);
  } catch (err) {
    console.log(err);
  }
};

// display team details by id
const displayDetails = (team) => {
  const teamDetailsDiv = document.getElementById('team-details');
  teamDetailsDiv.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
     <img src="${team.strTeamBadge}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h3 class="card-title text-center">${team.strTeam}</h3>
    <p class="card-text">${team.strDescriptionEN}</p>
    <a href="https://${team.strWebsite}" target="_blank" class="btn btn-primary">Website</a>
  </div>
  `;
  teamDetailsDiv.appendChild(div);
};

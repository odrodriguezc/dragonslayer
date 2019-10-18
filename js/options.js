let	dom = new Object ();
	dom.form = document.querySelector('#optionsForm');
	dom.playerName = dom.form.querySelector('#playerName');
	dom.level = dom.form.querySelector('#gameLevel');
	dom.gamePlayer = dom.form.querySelector('#gamePlayer');
	dom.saveOptions = dom.form.querySelector('#saveOptions');

	dom.userConfigurationDiv = document.querySelector('#userConfiguration');
	dom.userNameParr = dom.userConfigurationDiv.querySelector('userNameParr');
	dom.userPlayerParr = dom.userConfigurationDiv.querySelector('userPlayerParr');
	dom.gameLevelParr = dom.userConfigurationDiv.querySelector('levelParr');

dom.saveOptions.addEventListener('click', saveOptions);

function saveOptions(){
    game.playerName = dom.playerName.value;
	game.level = dom.level.selectedIndex;
	game.userPlayer = dom.gamePlayer.selectedIndex;

	dom.userConfigurationDiv.style.display = "block";
	dom.userNameParr.textContent = game.playerName;
	dom.userPlayerParr.textContent = game.userPlayer;
	dom.gameLevelParr.textContent = game.level;

}

	


	document.write('<p> Name : ' + game.playerName + '</p>');
	document.write('<p> Level : ' + game.level + '</p>');
	document.write('<p> Player : ' + game.player + '</p>');
	document.write('<a href="index.html" style="display: block;" >Go</a><a href="#" >Back</a>');


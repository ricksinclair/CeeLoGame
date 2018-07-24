//Cameron Nelson, July 2018

var wins, currentScore, activePlayer, trips;

init();

//Click roll
document.querySelector('.btn-roll').addEventListener('click', function() {
	var dice1 = Math.floor(Math.random() * 6) + 1;
	var dice2 = Math.floor(Math.random() * 6) + 1;
	var dice3 = Math.floor(Math.random() * 6) + 1;

	//Display result
	var dice1DOM = document.getElementById('dice-1');
	var dice2DOM = document.getElementById('dice-2');
	var dice3DOM = document.getElementById('dice-3');

	dice1DOM.style.display = 'block';
	dice2DOM.style.display = 'block';
	dice3DOM.style.display = 'block';

	dice1DOM.src = 'dice-' + dice1 + '.png';
	dice2DOM.src = 'dice-' + dice2 + '.png';
	dice3DOM.src = 'dice-' + dice3 + '.png';

	//RULES
	//Rule 1: 4-5-6: Automatic Win
	if((dice1 === 4 && dice2 === 5 && dice3 === 6) || (dice1 === 4 && dice2 === 6 && dice3 === 5) || (dice1 === 5 && dice2 === 4 && dice3 === 6) 
		|| (dice1 === 5 && dice2 === 6 && dice3 === 4) || (dice1 === 6 && dice2 === 4 && dice3 === 5) || (dice1 === 6 && dice2 === 5 && dice3 === 4))
	{
		//Add score
		wins[activePlayer]++;
		document.getElementById('score-' + activePlayer).textContent = wins[activePlayer];
		document.getElementById('current-' + activePlayer).textContent = '4-5-6';
		document.getElementById('description-' + activePlayer).style.display = 'block';
		document.getElementById('description-' + activePlayer).textContent = '4-5-6';

		//Switch Players
		if(activePlayer === 0)
		{
			switchPlayers();
			switchPlayers();
		}
		else
			switchPlayers();
	}

	//Rule 2: 1-2-3: Automatic Loss
	else if((dice1 === 1 && dice2 === 2 && dice3 === 3) || (dice1 === 1 && dice2 === 3 && dice3 === 2) || (dice1 === 2 && dice2 === 1 && dice3 === 3) 
		|| (dice1 === 2 && dice2 === 3 && dice3 === 1) || (dice1 === 3 && dice2 === 1 && dice3 === 2) || (dice1 === 3 && dice2 === 2 && dice3 === 1))
	{
		if(activePlayer === 1)
		{
			wins[0]++;
			document.getElementById('score-0').textContent = wins[0];
			document.getElementById('current-1').textContent = '1-2-3';
			document.getElementById('description-1').style.display = 'block';
			document.getElementById('description-1').textContent = '1-2-3';
		}
		else
		{
			wins[1]++;
			document.getElementById('score-1').textContent = wins[1];
			document.getElementById('current-0').textContent = '1-2-3';
			document.getElementById('description-0').style.display = 'block';
			document.getElementById('description-0').textContent = '1-2-3';			
		}

		//Switch players
		if(activePlayer === 0)
		{
			switchPlayers();
			switchPlayers();
		}
		else
			switchPlayers();
	}

	//Rule 3: Trips
	else if(dice1 === dice2 && dice1 === dice3)
	{
		currentScore[activePlayer] = dice1;
		document.getElementById('current-' + activePlayer).textContent = currentScore[activePlayer];

		trips = true;

		document.getElementById('description-' + activePlayer).style.display = 'block';
		document.getElementById('description-' + activePlayer).textContent = 'Trips';

		nextPlayer();
	}

	//Rule 4: Point
	else if(dice1 === dice2 || dice1 === dice3 || dice2 === dice3)
	{
		if(trips === true)
		{
			wins[0]+=1;
			document.getElementById('score-0').textContent = wins[0];
			switchPlayers();
		}

		else if(dice1 === dice2)
		{
			currentScore[activePlayer] = dice3;
			tripsFunction();
		}
		else if(dice1 === dice3)
		{
			currentScore[activePlayer] = dice2;
			tripsFunction();
		}
		else
		{
			currentScore[activePlayer] = dice1;
			tripsFunction();
		}
	}
});

//Click End
document.querySelector('.btn-end').addEventListener('click', function() {
	var winner = -1;

	if(wins[0] > wins[1])
		winner = 0;
	else if(wins[1] > wins[0])
		winner = 1;
	else
		winner = 100;

	if(winner != 100)
	{
		document.getElementById('name-' + winner).textContent = 'WINNER!';
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
		document.getElementById('dice-3').style.display = 'none';
		document.querySelector('.player-' + winner + '-panel').classList.add('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
	}

});

//Click new
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer()
{
	switchPlayers();

	//Check for round winners
	if(activePlayer === 0)
	{
		if(currentScore[0] > currentScore[1])
		{
			wins[0]++;
			document.getElementById('score-0').textContent = wins[0];
		}
		else if(currentScore[1] > currentScore[0])
		{
			wins[1]++;
			document.getElementById('score-1').textContent = wins[1];
		}
	}
}

function init() 
{
	wins = [0, 0];
	currentScore = [0, 0];
	activePlayer = 0;
	trips = false;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	document.getElementById('dice-3').style.display = 'none';

	document.getElementById('description-0').style.display = 'none';
	document.getElementById('description-1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2 ';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');	
}

function switchPlayers()
{
	if(activePlayer === 1)
		activePlayer = 0;
	else
		activePlayer = 1;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function tripsFunction()
{
		document.getElementById('description-' + activePlayer).style.display = 'block';
		document.getElementById('description-' + activePlayer).textContent = 'Point';
		document.getElementById('current-' + activePlayer).textContent = currentScore[activePlayer];
		nextPlayer();
}

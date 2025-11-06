oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jawa.omp.json" | Invoke-Expression
Import-Module -Name Terminal-Icons

Function mvnci { mvn clean install -DskipTests }

Function gitc { git clean -df }

Function gitr { git reset --hard }

Function gits { git status }

Function gitd { git diff }

function gitx {
	gitc
	gitr
	gits	
}

function gitrf {
	param(
		[string]$file = ""
	)
	
	git checkout HEAD -- $file
	gits
}
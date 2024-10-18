# rugby-live-reporting-app
Application to declare the events of a rugby match (scores, substitutions, injuries, etc.)

## Stack
React Native, Typescript

## TO DO
- Database
  - [ ] Team : name
  - [x] Game : teamHome, teamVisitor, scoreHome, scoreVisitor, highlightsHome, highlightsVisitor
  - [ ] Highlight : gameId, teamId, type (try, penalty kick, substition...), time
- Configuration Game Screen: configure the rugby match
  - [x] Form to select home and visitor teams
  - [x] Button to submit form and open "Game Overview Screen"
  - [x] POST new game in DB
    - [x] Handle error on POST request
- Game Overview Screen: watch game overview of the rugby match
  - [x] Button to start/pause the timer
  - [x] Button to open "AddHighlight Screen"
  - [x] Change button "Quit" to "End half time" when "Start" button clicked
    - [x] Add half time state (1 or 2) in store
    - [x] update timer to 40:00 and update half state to 2
  - [x] Change button "End half time" to "Quit" when "End half time" button is clicked
  - [x] Change button "Quit" to "End game" when "Start" button is clicked
  - [x] On click "End game" : display alert to confirm end game, reset store, redirect to home
  - [ ] //More : Two buttons to open "AddHighlight Screen" with team already selected
- AddHighlight Screen: report highlight of a team
  - [x] Two tabs (Highlight, Players)
  - [x] Tab Highlight
    - [x] Radio buttons : Team
    - [x] Select field: ScoringHighlight Type (try, convertedTry, penaltyTry, penalty, dropGoal)
    - [x] Select field : Time (1 to 80)
      - [x] Default value according to timer
    - [x] Validate form
      - [x] Error no team selected
      - [x] Error no minute selected
      - [x] Error no highlight data found
    - [x] POST new highlight
      - [x] Handle error on POST highlight
  - [x] Tab Players
    - [x] Radio buttons : Team
    - [x] Select field: DisciplinaryHighlight|SubstitutionHighlight Type (yellowCard, redCard | substitution )
    - [x] Select field : Time (1 to 80)
      - [x] Default value according to timer
    - [x] Select field: Player involved if DisciplinaryHighlight selected
    - [x] Select field: Player substituted if SubstitutionHighlight selected
    - [x] Select field: Player substitute if SubstitutionHighlight selected
    - [x] Validate form
      - [x] Error no team selected
      - [x] Error no minute selected
      - [x] Error no highlight data found
      - [x] Error no player involved|substituted
      - [x] Error no player substitute if SubstitutionHighlight selected
- History Screen
  - [x] Display list of past games
  - [x] GET all games
    - [ ] Handle error on GET all games
  - [ ] On click row past game, redirect to GameOverview screen with all data from game
    - [ ] Navigate to GameOverview with game ID in route params
    - [x] GET game by id
      - [ ] Handle error GET game by id

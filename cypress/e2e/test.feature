Feature: Play video button

On a show's details page, there should be a button labeled PLAY.
Clicking that button should display a modal window with a video.

Scenario: Open the details page and press play
  Given I open a show's details page
  When I click the PLAY button
  Then A window with a video is displayed

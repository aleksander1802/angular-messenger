# Scoring: Final task

## Milestone 1. Registration

**Score:** 60

-   [x] page with dedicated url: **5 points**
-   [x] validation for _name_ and _email_ fields with error messages: **5 points**
-   [x] validation for _password_ field with error messages: **5 points**
-   [x] redirection to sign-in page after successful registration: **5 points**
-   [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or
        succeed: **10 points**
-   [x] _Submit_ button is disabled if form is invalid. Also, it should be disabled after http error with
        type `PrimaryDuplicationException` until the user changes the field value: **10 points**
-   [x] _Submit_ button is disabled (user cannot click it) and `email` field has error message of taken
        account if user type the same email address that he tried to send before and got an
        error `PrimaryDuplicationException`: **10 points**
-   [x] _Submit_ button is disabled (user cannot click it) after clicking while http-request is in
        progress: **10 points**

## Milestone 2. Login

**Score:** 70

-   [x] default page for unauthorized user: **10 points**
-   [x] validation for _email_ field with error messages: **5 points**
-   [x] validation for _password_ field with error messages: **5 points**
-   [x] redirection to the main page after successful authentication: **10 points**
-   [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or
        succeed: **10 points**
-   [x] _Submit_ button is disabled (user cannot click it) if form is invalid. Also, it should be disabled
        after http error with type `NotFoundException` until the user changes `email` or `password` field
        value: **10 points**
-   [x] _Submit_ button is disabled (user cannot click it) after clicking while http-request is in
        progress: **10 points**
-   [x] `token`, `uid` and `email` value is saved in `localStorage` after successful sign in and used
        again in the following http-requests even after page reloading (it allows user to omit
        sign in again after page reloading): **10 points**

    ## Milestone 3. Profile

**Score:** 40

-   [x] `user id`, `email`, `creation time`, `user name` data of current user is displayed
        on the page: **30 points**
-   [x] error message with appropriate text are displayed on the page if loading http-request fails
        (for instance, if internet connection is lost): **10 points**

## Milestone 4. Profile updating

**Score:** 55

-   [x] button _Edit_ makes `name` field editable: **10 points**
-   [x] button _Cancel_ returns initial page state (static appearance): **5 points**
-   [x] clicking the button _Save_ sends 1 http-request to save new data without the ability to click it
        again (along with _Cancel_ button) until process is end: **20 points**
-   [x] buttons _Cancel_ and _Save_ are visible ony for editable form: **5 points**
-   [x] button _Edit_ is visible only for static page: **5 points**
-   [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or
        succeed: **10 points**

## Milestone 5. Logout

**Score:** 40

-   [x] clicking on `Logout` button the http-request is sent
        with `DELETE` method: **10 points**
-   [x] user is redirected to Sign-In page after successful logout process: **10 points**
-   [x] all data in `cookies`, `localStorage` is deleted: **10 points**
-   [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or
        succeed: **10 points**

## Milestone 6. People & Groups

**Score:** 175

-   [x] default page for authorized user: **10 points**
-   [x] page is divided on 2 vertical sections with independent content: **5 points**

#### Group section (left)

-   [x] the list of available groups is loaded if user opens this page first time: **5 points**
-   [x] the list item created by current user should contain _Delete_ button: **10 points**
-   [x] the confirmation modal appears after clicking on _Delete_ button on list item with _Cancel_,
        _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the
        http-request is sent and item is removed from the list after succeeded response: **15 points**
-   [x] clicking on _Update_ button sends corresponding http-request and update group
        list if succeeded: **10 points**
-   [x] countdown appears for 1 minute after clicking on _Update_ button
        (except if error occurs): **10 points**
-   [x] _Update_ button is disabled (user cannot click it) after clicking during updating and until the
        timer is active: **5 points**
-   [x] clicking on _Create_ button the modal window is opened. There is form with validation and
        submit button: **10 points**
-   [x] submit button in modal window should be disabled (user cannot click it) until form
        is valid: **5 points**
-   [x] clicking on submit button in modal window the appropriate http-request is sent to create new
        group. Modal window is closed only if http-request succeeded: **15 points**
-   [x] [toast messages](./README.md#toast) with appropriate text are displayed if http-request fails or
        succeed: **10 points**
-   [x] clicking on list item the user is redirected to group dialog page: **5 points**

#### People list (right)

-   [x] the list of people is loaded if user opens this page first time: **10 points**
-   [x] the list item with which current user already has active conversation has
        special background: **10 points**
-   [x] clicking on _Update_ button sends corresponding http-request and update people list
        if succeeded: **10 points**
-   [x] countdown appears for 1 minute after clicking on _Update_ button
        (except if error occurs): **10 points**
-   [x] _Update_ button is disabled (user cannot click it) after clicking during updating and until the
        timer is active: **5 points**
-   [x] clicking on list item the user is redirected to personal conversation page. New conversation (via
        certain http-request) is created if it has not already created before transition: **15 points**

## Milestone 7. Group dialog

**Score:** 140

-   [x] the page is protected by a guard only for authorized user: **5 points**
-   [x] the error message is displayed if group with provided id does not exist: **10 points**
-   [x] _Return back_ is a link, not a button: **5 points**
-   [x] the full message history is loaded if user visit this page first time: **10 points**
-   [x] only the last messages (using `since` parameter) are loaded if user opens this group conversation
        again: **20 points**
-   [x] only the last messages (using `since` parameter) are loaded if user clicks on
        _Update_ button: **20 points**
-   [x] messages in corresponding area are sorted by time. New messages are appended at
        the bottom: **5 points**
-   [x] message item contains readable time, user name and text. Own messages are displayed on the right.
        Other messages are displayed on the left: **10 points**
-   [x] countdown appears for 1 minute after clicking on _Update_ button
        (except if error occurs): **10 points**
-   [x] _Update_ button is disabled (user cannot click it) after clicking during updating and until the
        timer is active: **5 points**
-   [x] group is created by current user should contain _Delete_ button: **10 points**
-   [x] the confirmation modal appears after clicking on _Delete_ button with _Cancel_,
        _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the
        http-request is sent and the user is redirected to main page after succeeded
        response: **10 points**
-   [x] form field has `required` validator. _Send new message_ button is disabled (user cannot click it)
        until field has text: **5 points**
-   [x] new messages are loaded (using `since` parameter) after successful sending
        new message: **15 points**

## Milestone 8. Person conversation

**Score:** 140

-   [x] the page is protected by a guard only for authorized user: **5 points**
-   [x] the error message is displayed if conversation with provided id does not exist: **10 points**
-   [x] _Return back_ is a link, not a button: **5 points**
-   [x] the full message history is loaded if user visit this page first time: **10 points**
-   [x] only the last messages (using `since` parameter) are loaded if user opens this group conversation
        again: **25 points**
-   [x] only the last messages (using `since` parameter) are loaded if user clicks on
        _Update_ button: **25 points**
-   [x] messages in corresponding area are sorted by time. New messages are appended at
        the bottom: **5 points**
-   [x] message item contains readable time, user name and text. Own messages are displayed on the right.
        Other messages are displayed on the left: **10 points**
-   [x] countdown appears for 1 minute after clicking on _Update_ button
        (except if error occurs): **10 points**
-   [x] _Update_ button is disabled (user cannot click it) after clicking during updating and until the
        timer is active: **5 points**
-   [x] the confirmation modal appears after clicking on _Delete_ button with _Cancel_,
        _Delete_ button inside. If user clicks _Cancel_ the modal disappears. If user clicks _Delete_ the
        http-request is sent and the user is redirected to main page after succeeded
        response: **10 points**
-   [x] form field has `required` validator. _Send new message_ button is disabled (user cannot click it)
        until field has text: **5 points**
-   [x] new messages are loaded (using `since` parameter) after successful sending
        new message: **15 points**

## Milestone 9. 404 page

**Score:** 30

-   [x] error message is displayed about wrong url/page: **30 points**

## Milestone 10. Dark/Light theme.

**Score:** 50

-   [x] chosen state is saved in `localStorage` and used/applied after reloading. User can refresh the
        page and see the same theme: **20 points**
-   [x] light/dark styles are applied to main page: **10 points**
-   [x] light/dark styles are applied to group dialog page: **10 points**
-   [x] light/dark styles are applied to personal conversation page: **10 points**

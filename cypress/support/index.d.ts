declare namespace Cypress {
  interface Chainable {
    /**
     * Intercept GQL request
     * @param operationName Name of GQL operation to intercept
     */
    interceptGQL(operationName: string): void;

    /**
     * Get users of the chapter using GQL query
     * @param chapterId Id of the chapter
     */
    getChapterMembers(chapterId: number): Chainable<any>;

    /**
     * Get event users for event with eventId using GQL query
     * @param eventId Id of the event
     */
    getEventUsers(eventId: number): Chainable<any>;

    /**
     * Authenticate with JWT token
     * @param token JWT token for authorization. If not provided, Cypress.env.JWT token is used.
     */
    login(token?: string): void;

    /**
     * Register user using GQL query
     */
    register(firstName: string, lastName: string, email: string): void;

    /**
     * Register user using page UI
     */
    registerViaUI(firstName: string, lastName: string, email: string): void;

    /**
     * Wait until emails are received by mailhog
     * @param alias Name of the alias to reference emails by
     */
    waitUntilMail(alias: string): void;

    /**
     * Create event using GQL mutation
     * @param data Data of the event. Equivalent of CreateEventInputs for the Events resolver.
     */
    createEvent(data): Chainable<any>;

    /**
     * Delete event using GQL mutation
     * @param eventId Id of the event for deletion
     */
    deleteEvent(eventId: number): Chainable<any>;

    /**
     * Check if mail recipients are bcc
     * @param mail The sent mail of type Item(cypress-mailhog)
     */
    checkBcc(mail): Chainable<boolean>;

    /**
     * Create chapter using GQL mutation
     * @param data Data of the chapter. Equivalent of CreateChapterInputs for the Chapter resolver.
     */
    createChapter(data): Chainable<any>;

    /**
     * Update chapter using GQL mutation
     * @param chapterId Id of the chapter
     * @param data Data of the chapter. Equivalent of UpdateChapterInputs for the Chapter resolver.
     */
    updateChapter(chapterId: number, data): Chainable<any>;

    /**
     * Confirm rsvp of user with userId for the event with eventId
     * @param eventId Id of the event
     * @param userId Id of the user
     */
    confirmRsvp(eventId: number, userId: number): Chainable<any>;

    /**
     * Delete rsvp of user with userId for the event with eventId
     * @param eventId Id of the event
     * @param userId Id of the user
     */
    deleteRsvp(eventId: number, userId: number): Chainable<any>;

    /**
     * Rsvp to event with eventId and chapterId
     * @param eventId Id of the event
     * @param chapterId Id of the chapter
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    rsvpToEvent(
      { eventId, chapterId }: { eventId: number; chapterId: number },
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Auth request, with token of the logged in user, before sending it.
     * @param options Request options
     */
    authedRequest(options): Chainable<any>;

    /**
     * Create sponsor using GQL mutation
     * @param data Data of the sponsor. Equivalent of CreateSponsorInputs for the Sponsor resolver.
     */
    createSponsor(data): Chainable<any>;

    /**
     * Update sponsor using GQL mutation
     * @param id Sponsor id
     * @param data Data of the sponsor. Equivalent of UpdateSponsorInputs for the Sponsor resolver.
     */
    updateSponsor(id: number, data): Chainable<any>;

    /**
     * Subscribe to notifications for a single event
     * @param eventId Id of the event
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    subscribeToEvent(
      { eventId }: { eventId: number },
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Unsubscribe from notifications for a single event
     * @param eventId Id of the event
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    unsubscribeFromEvent(
      { eventId }: { eventId: number },
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Create venue using GQL mutation
     * @param chapterId Id of the chapter
     * @param data Data of the venue. Equivalent of CreateVenueInputs for the Venue resolver.
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    createVenue(
      { chapterId }: { chapterId: number },
      data: any,
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Update venue using GQL mutation
     * @param chapterId Id of the chapter
     * @param venueId Id of the venue
     * @param data Data of the venue. Equivalent of UpdateVenueInputs for the Venue resolver.
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    updateVenue(
      { venueId, chapterId }: { venueId: number; chapterId: number },
      data: any,
      options?: { withAuth: true },
    ): Chainable<any>;

    /**
     * Delete venue using GQL mutation
     * @param chapterId Id of the chapter
     * @param venueId Id of the venue
     * @param {object} [options={ withAuth: true }] Optional options object.
     */
    deleteVenue(
      { venueId, chapterId }: { venueId: number; chapterId: number },
      options?: { withAuth: true },
    ): Chainable<any>;
  }
}

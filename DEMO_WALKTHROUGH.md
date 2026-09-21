# Demo walkthrough (approximately five minutes)

1. Open DesignLab and choose Parking Lot. Read the requirements on the left.
2. Try submitting without input: it should explain which required section needs more detail.
3. Enter the four sample sections below. These are demonstration input, not a canonical answer.
4. Submit for review. Explain that this prototype runs a deterministic rubric review; it does not claim to verify correctness.
5. Read the evidence excerpt and requirement-specific questions. “Evidence found” indicates matching explanatory text, not verified correctness.
6. Click Revise this design. Change the edge-case explanation and submit again.
7. Open My attempts and show both saved snapshots. Open an old attempt; the design is read-only.
8. Export the design and feedback as JSON. Select a second problem to show its different requirements.
9. Run the domain tests and explain the evaluator/repository interfaces in lib/practice.ts.

## Sample input — classes and responsibilities

Vehicle stores its registration and type. ParkingSpot owns its type and occupied state. Ticket stores a unique ID, vehicle, spot, entry time, and checkout status. ParkingService coordinates entry and exit. PricingPolicy computes a fee.

## Sample input — relationships and interfaces

ParkingService uses a SpotRepository and a TicketRepository. Ticket references one Vehicle and one ParkingSpot. HourlyPricing implements PricingPolicy; ParkingService receives that interface through its constructor. The repositories isolate storage, while the pricing policy isolates a specific variation in business behaviour.

## Sample input — core behaviour

On entry, ParkingService atomically finds and reserves a compatible spot, then saves a unique active ticket. On exit it loads the ticket, checks active status, computes the fee from elapsed time and vehicle type, marks the ticket closed, and releases the spot in one transaction.

## Sample input — edge cases and trade-offs

If full, return NoSpotAvailable without creating a ticket. Reject unknown IDs. Return the original checkout result for a duplicate request. Use a transaction to prevent simultaneous allocation. Round up to the next hour, with a one-hour minimum. Assume no payment gateway.

## Suggested revision

Explain what happens when saving the ticket fails after spot reservation: both operations must share a transaction, or the spot reservation must be released on failure. This is a design improvement to discuss manually; the current reviewer cannot verify it.

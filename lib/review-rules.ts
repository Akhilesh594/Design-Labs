// Heuristics identify supporting passages, not semantic proof. Each rule
// requires concepts to occur together in an explanatory sentence.
export type ReviewRule = {id:string; section:'entities'|'relationships'|'flow'|'edges';title:string;patterns:RegExp[];guidance:string;priority:number};
const rule=(id:string,section:ReviewRule['section'],title:string,patterns:RegExp[],guidance:string,priority=2):ReviewRule=>({id,section,title,patterns,guidance,priority});
export const commonRules:ReviewRule[]=[
rule('ownership','entities','State ownership',[/\b(owns?|stores?|encapsulates?|maintains?|holds?|tracks?)\b/i], 'Name which object owns mutable state and which operations protect it. Example: ParkingSpot owns occupancy; reserve() prevents a second reservation.'),
rule('collaboration','relationships','Object collaboration',[/\b(uses?|depends?|references?|receives?|calls?|implements?|compos\w*|associat\w*)\b/i], 'Trace a collaboration between two named objects. Explain ownership and the direction of the dependency; an interface is not mandatory.'),
rule('variation','relationships','A justified extension point',[/\b(interface|policy|strategy|replace\w*|inject\w*|constructor|fixed|simpl\w*)\b/i], 'Identify one expected change and explain which class absorbs it. If the behaviour is deliberately fixed, explain why an interface would be unnecessary.',3)
];
export const problemRules:Record<string,ReviewRule[]>={
'parking-lot':[
rule('compatible','flow','Compatible spot allocation',[/\b(compatib\w*|vehicle type|motorcycl\w*|car\w*)\b/i,/\b(spot|space)\b/i,/\b(find\w*|assign\w*|reserv\w*|select\w*|allocat\w*)\b/i],'Show how entry selects a free spot compatible with the vehicle type, and name the owner of that decision.',1),
rule('ticket','flow','Unique entry ticket',[/\b(unique|uuid|identifier)\b/i,/\bticket\b/i,/\b(issu\w*|sav\w*|creat\w*)\b/i],'Explain how entry creates a unique ticket linked to the vehicle, spot, and entry time.',1),
rule('fee','flow','Fee calculation inputs',[/\b(fee|pric\w*)\b/i,/\b(duration|elapsed|time|hour\w*)\b/i,/\b(type|vehicle)\b/i],'Show the fee calculation using elapsed duration and vehicle type; name the class that performs it.',1),
rule('release','flow','Checkout releases the spot',[/\b(releas\w*|free\w*)\b/i,/\bspot\b/i,/\b(checkout|exit|closed|success\w*)\b/i],'Trace successful checkout through ticket closure and spot release so capacity becomes available again.',1),
rule('full','edges','Full-capacity response',[/\b(full|nospotavailable|no (?:free|available) spot)\b/i,/\b(return|reject|error|without|fail)\b/i],'Specify the full-lot response and confirm that no ticket or reservation is left behind.',1),
rule('unknown','edges','Unknown ticket response',[/\b(unknown|invalid|missing)\b/i,/\b(ticket|id\w*)\b/i,/\b(reject|return|error)\b/i],'Define how checkout responds to an unknown ticket without changing occupancy.',1),
rule('duplicate','edges','Repeated checkout',[/\b(duplicate|repeat\w*|idempot\w*)\b/i,/\b(return|reject|ignore|original|prevent)\b/i],'Describe repeat checkout: return the original receipt or reject it, without charging or releasing twice.',1),
rule('atomic','edges','Competing reservations',[/\b(transaction|atomic\w*|lock\w*|synchron\w*)\b/i,/\b(reserv\w*|allocat\w*|spot|simultaneous)\b/i],'Explain how two entry requests cannot reserve the same spot, and how a failed ticket save rolls back the reservation.',2),
rule('rounding','edges','Billing boundary policy',[/\b(round\w*|ceil\w*|minimum)\b/i,/\b(hour|minute|fee)\b/i],'State rounding, the minimum charge, and the result exactly at a billing boundary.',3)],
'vending-machine':[
rule('display','flow','Product availability display',[/\b(display\w*|show\w*|list\w*)\b/i,/\b(price\w*)\b/i,/\b(stock|count|quantity)\b/i],'Describe how the user sees product prices and available stock.',2),
rule('balance','flow','Transaction balance',[/\b(accept\w*|insert\w*|add\w*)\b/i,/\b(money|coin\w*|payment)\b/i,/\b(balance|transaction)\b/i],'Name the transaction that owns inserted money and how accepting a coin changes its balance.',1),
rule('validate','flow','Dispensing prerequisites',[/\b(validat\w*|check\w*|sufficient)\b/i,/\bstock\b/i,/\b(balance|funds|money)\b/i],'Check both stock and sufficient funds before dispensing; explain when inventory and balance change.',1),
rule('refund','edges','Cancellation and refund',[/\b(cancel\w*)\b/i,/\b(refund\w*|return\w*)\b/i],'Explain cancellation, refund ownership, and resetting the transaction balance.',1),
rule('change','edges','Unavailable change',[/\b(change)\b/i,/\b(unavailable|insufficient|cannot|exact|not enough)\b/i],'Describe what happens when correct change cannot be made before dispensing.',1),
rule('stock','edges','Out-of-stock response',[/\b(unavailable|out.of.stock|empty)\b/i,/\b(product|stock|item)\b/i,/\b(reject|refund|return|without)\b/i],'Reject an out-of-stock selection without consuming the customer balance.',1),
rule('failure','edges','Dispensing failure recovery',[/\b(dispens\w*)\b/i,/\b(fail\w*)\b/i,/\b(refund|restore|rollback|roll back)\b/i],'Walk through a dispenser failure after reservation and restore inventory and customer funds.',1),
rule('money','edges','Exact currency representation',[/\b(integer|cents|paise)\b/i,/\b(money|currency|units|price)\b/i],'Use integer minor currency units and explain how change is calculated.',2)],
'elevator':[
rule('requests','flow','Inside and outside requests',[/\b(internal|inside|destination)\b/i,/\b(external|outside|hall)\b/i,/\b(request|button)\b/i],'Distinguish external pickup requests from internal destinations and show how each enters the pending queue.',2),
rule('state','entities','Elevator state ownership',[/\bfloor\b/i,/\bdirection\b/i,/\b(state|door)\b/i],'Name the owner of the current floor, direction, and door state.',1),
rule('schedule','flow','Pending request scheduling',[/\b(schedul\w*|queue|fifo)\b/i,/\b(next|stop|request)\b/i],'Explain how a pending request becomes the next stop and when it is removed.',1),
rule('doors','flow','Door safety invariant',[/\b(closed?.door|close doors|doors? closed|never move with doors open)\b/i,/\b(move\w*|movement|safe|verify|never)\b/i],'Explicitly prevent movement while doors are open. Identify the object and guard enforcing that invariant.',1),
rule('arrival','flow','Arrival and door opening',[/\b(destination|arriv\w*|stop)\b/i,/\bopen\w*\b/i,/\bdoors?\b/i],'Trace arrival: stop movement, remove the served request, then open the doors.',1),
rule('duplicate','edges','Duplicate request handling',[/\b(deduplicat\w*|duplicate|repeat\w*)\b/i,/\b(request|ignore|merge)\b/i],'Explain deduplication of an already-pending floor request.',2),
rule('bounds','edges','Invalid floor bounds',[/\b(reject|validat\w*)\b/i,/\bfloors?\b/i,/\b(outside|range|invalid|0|9|10)\b/i],'Reject floors outside the supported range before changing the queue.',1),
rule('emergency','edges','Emergency stop and recovery',[/\bemergency\b/i,/\b(stop|prevent\w*)\b/i,/\b(reset|resume|preserv\w*)\b/i],'Explain how an emergency blocks movement, preserves requests, and requires an explicit safe reset.',1)]};

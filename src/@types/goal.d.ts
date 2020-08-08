/**
 * represents some sort of action to be taken
 */
interface Goal
{
  /**
   * name of the goal to be taken
   */
  name: string;

  /**
   * body parts needed to carry out the goal
   */

  /**
   * priority for this goal
   */
  priority: number;

  /**
   * name of the Behavior to be carried out by units carrying out this goal
   * goals with the same name are processed together, so it is important that
   * all goals with the same name and priority have the same REQUIREMENTS
   * It is, however, acceptable for their PREFERENCES to vary
   */
  behaviorName: string;

  /**
   * position this goal is to be performed at
   */
  pos: RoomPosition;

  /**
   * if specified, this information is passed to the behavior.  Each behavior will treat this argument differently.
   */
  goalArgs?: any,

  /**
   * if specified, creep needs at least this much energy to perform the task
   */
  minimumEnergy?: number;

  /**
   * if specified, creep needs at least this much of any non-energy resource to perform the task
   */
  minimumMinerals?: number;

  /**
   * if specified, creep must have at least this much open capacity
   */
  minimumOpenCapacity?: number;

  /**
   * if specified, goal PREFERS a creep with at least this much energy
   */
  prefersEnergy?: number;

  /**
   * if specified, goal PREFERS a creep with at least this much open capacity
   */
  prefersOpenCapacity?: number;

  /**
   * if specified, maximum number of creeps that can work on this goal at once
   */
  maximumCreepCount?: number;

  /**
   * if no creeps could meet the requirements of this goal, puts in a request for a unit that supports the given role.
   * this goal is then set on the newly created request, so that the new creep immediately begins work on it
   */
  ifRequirementsUnmetSpawn?: string;

  behaviorMemory?: any; //typeless memory to be used by behaviors during this goal
}

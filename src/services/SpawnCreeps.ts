// import {ZevrantCreepMemory} from "../pojo/ZevrantCreepMemory";
// import {CreepConstants} from "../constants/CreepConstants";
// import {RandomNameGenerator} from "../utils/RandomNameGenerator";
// import {CreepUtils} from "../utils/CreepUtils";
// import {spawn} from "child_process";
// import {BuilderConstants} from "./Builder";
//
// export class SpawnCreeps {
//
//   public spawnHarvesters(room: Room): boolean {
//     let energyCount: number = room.find(FIND_SOURCES_ACTIVE).length * 3 + 1;
//     let creeps = room.find(FIND_MY_CREEPS);
//     let harvesterCount: number = CreepUtils.getCreepsForRole(creeps, CreepConstants.ROLE_HARVESTER).length;
//
//     if(harvesterCount < energyCount){
//       _.forEach(room.find(FIND_MY_SPAWNS), spawner => {
//         let sources = room.find(FIND_SOURCES_ACTIVE)[Math.floor(Math.random() * (energyCount / 2))];
//         if(sources !== undefined && sources.id !== undefined) {
//           let memory: ZevrantCreepMemory = new ZevrantCreepMemory(CreepConstants.ROLE_HARVESTER, room.name, true, sources.id, null);
//           if (energyCount != harvesterCount) {
//             spawner.spawnCreep([MOVE, MOVE, MOVE, CARRY, WORK], RandomNameGenerator.generate(), {memory: memory});
//             harvesterCount += 1;
//           }
//         }
//       })
//     }
//     return harvesterCount == energyCount;
//   }
//
//   public spawnRoomUpgraders(room: Room) {
//     let sources = room.find(FIND_SOURCES_ACTIVE);
//     let creeps = room.find(FIND_MY_CREEPS);
//     let upgraderCount: number =  CreepUtils.getCreepsForRole(creeps, CreepConstants.ROLE_ROOM_UPGRADER).length;
//
//     _.forEach(room.find(FIND_MY_SPAWNS), spawner => {
//       if(upgraderCount < 2) {
//         let memory: ZevrantCreepMemory = new ZevrantCreepMemory(CreepConstants.ROLE_ROOM_UPGRADER, room.name, true, spawner.id, null);
//         spawner.spawnCreep([MOVE, MOVE, MOVE, CARRY, WORK], RandomNameGenerator.generate(), {memory: memory});
//         upgraderCount += 1;
//       }
//     });
//   }
//
//   public spawnBuilders(room: Room) {
//     let creeps = room.find(FIND_MY_CREEPS);
//     let builderCount: number =  CreepUtils.getCreepsForRole(creeps, CreepConstants.ROLE_BUILDER).length;
//     let constructionSites = room.find(FIND_CONSTRUCTION_SITES);
//     let spawners = room.find(FIND_MY_SPAWNS);
//     // for(let i = 0; i < spawners.length; i++) {
//       _.forEach(constructionSites, site => {
//         if (builderCount < constructionSites.length) {
//           let map = new Map<string, any>();
//           // @ts-ignore
//           map[BuilderConstants.constructionSite] = site;
//           let memory: ZevrantCreepMemory = new ZevrantCreepMemory(CreepConstants.ROLE_BUILDER, room.name, true, spawners[0].id, map);
//           spawners[0].spawnCreep([MOVE, MOVE, CARRY, CARRY, WORK], RandomNameGenerator.generate(), {memory: memory});
//           // i += 1;
//           builderCount += 1;
//         }
//       });
//     // }
//   }
//
//
//
// }

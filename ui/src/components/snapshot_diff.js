export function getAllNodesWithUsagePath1(data) {
  var result = [];
  var seen = {}; // ← replaces Set

  function traverse(node, path) {
    path = path || [];

    var current = `${node.projectName}(${node.snapshotName})`;
    var newPath = path.concat(current);
    var key = node.projectName + "-" + node.snapshotId;

    if (!seen[key]) {
      seen[key] = true;
      result.push({
        projectName:node.projectName,
        projectId: node.projectId,
        snapshotId: node.snapshotId,
        snapshotName: node.snapshotName,
        usagePath: newPath.join("/")
      });
    }

    if (node.projDeps && node.projDeps.length) {
      for (var i = 0; i < node.projDeps.length; i++) {
        traverse(node.projDeps[i], newPath);
      }
    }
  }

  for (var i = 0; i < data.length; i++) {
    traverse(data[i], []);
  }

  return result;
}
export function getAllNodesWithUsagePath(data) {
  var allNodes = {};

  // Step 1: Traverse tree and collect all nodes by projectId
  function traverse(node, path) {
    path = path || [];
    var currentPath = path.concat(`${node.projectName}(${node.snapshotName})`);

    // Initialize array for this projectId
    if (!allNodes[node.projectId]) {
      allNodes[node.projectId] = [];
    }

    // Add node info
    allNodes[node.projectId].push({
      projectName:node.projectName,
      projectId: node.projectId,
      snapshotId: node.snapshotId,
      snapshotName: node.snapshotName,
      usagePath: currentPath.join(" -> ")
    });

    // Recurse
    if (node.projDeps && node.projDeps.length) {
      for (var i = 0; i < node.projDeps.length; i++) {
        traverse(node.projDeps[i], currentPath);
      }
    }
  }

  for (var i = 0; i < data.length; i++) {
    traverse(data[i], []);
  }

  // Step 2: Filter only nodes where snapshotId differs (true duplicates)
  var result = [];
  for (var projectId in allNodes) {
    var snapshots = allNodes[projectId];
    var uniqueSnapshots = {};

    for (var j = 0; j < snapshots.length; j++) {
      uniqueSnapshots[snapshots[j].snapshotId] = true;
    }

    // Only add nodes if there is more than 1 snapshotId
    if (Object.keys(uniqueSnapshots).length > 1) {
      result = result.concat(snapshots);
    }
  }

  return result;
}

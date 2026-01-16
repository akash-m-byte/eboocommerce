/**
 * Helper script to add Swagger setup to a service
 * Usage: Update the service's index.ts to include setupSwagger
 */

import { setupSwagger } from '../utils/swagger';

// Example usage in service index.ts:
/*
import { setupSwagger } from '../../../shared/utils/swagger';

// After app setup, before routes:
setupSwagger(app, 'your-service-name');
*/

export { setupSwagger };

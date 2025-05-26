# Extreme Programming (XP) Practices Implementation Guide

## 1. Pair Programming

### Setup
- Use VS Code Live Share for remote pairing
- Switch driver/navigator roles every 25 minutes (Pomodoro technique)
- Both developers should be actively engaged

### Roles
**Driver**: 
- Controls keyboard and mouse
- Focuses on tactical implementation
- Writes the code

**Navigator**:
- Reviews code as it's written
- Thinks strategically about design
- Catches bugs and suggests improvements
- Keeps track of larger picture

### Best Practices
- Communicate constantly
- Be respectful and patient
- Take regular breaks
- Switch pairs daily to spread knowledge

## 2. Test-Driven Development (TDD)

### Red-Green-Refactor Cycle

#### Red Phase
\`\`\`bash
# Write a failing test first
npm test -- --watch
\`\`\`

#### Green Phase
\`\`\`bash
# Write minimal code to make test pass
# Don't worry about perfect code yet
\`\`\`

#### Refactor Phase
\`\`\`bash
# Improve code quality while keeping tests green
# Run tests frequently during refactoring
\`\`\`

### Testing Commands
\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test task-form.test.tsx
\`\`\`

### Test Structure
\`\`\`javascript
describe('Component/Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  })

  test('should do something specific', () => {
    // Arrange
    // Act  
    // Assert
  })
})
\`\`\`

## 3. Continuous Integration

### Git Workflow
\`\`\`bash
# Create feature branch
git checkout -b feature/task-creation

# Make small, frequent commits
git add .
git commit -m "Add task form validation"

# Push and create PR
git push origin feature/task-creation
\`\`\`

### Commit Message Format
\`\`\`
type(scope): description

feat(tasks): add task creation form
fix(validation): handle empty title field
test(tasks): add unit tests for task form
refactor(ui): improve task card layout
\`\`\`

### CI Pipeline Triggers
- Every push to main/develop branches
- Every pull request
- Runs tests, linting, and build
- Deploys to staging/production

## 4. Small Releases

### Daily Release Schedule
- **Day 1**: Project setup + basic task creation
- **Day 2**: Task viewing and listing
- **Day 3**: Task editing functionality  
- **Day 4**: Task deletion and filtering
- **Day 5**: Statistics and final polish

### Release Checklist
- [ ] All tests passing
- [ ] Code reviewed via pair programming
- [ ] Feature works in production
- [ ] Customer feedback incorporated
- [ ] Documentation updated

## 5. Refactoring

### When to Refactor
- Code smells detected
- Duplication found
- Tests are hard to write
- Adding new features is difficult

### Refactoring Techniques
- Extract functions/components
- Rename variables for clarity
- Remove dead code
- Simplify complex conditionals

### Safe Refactoring Process
1. Ensure all tests are green
2. Make small changes
3. Run tests after each change
4. Commit frequently

## 6. Customer Collaboration

### Customer Role Responsibilities
- Prioritize user stories
- Provide daily feedback
- Accept/reject completed features
- Clarify requirements

### Daily Customer Meetings
- **Time**: End of each day (15 minutes)
- **Agenda**: 
  - Demo completed features
  - Get feedback
  - Adjust priorities for next day
  - Clarify any questions

### Feedback Integration
- Immediate changes for critical issues
- Log enhancement requests for future sprints
- Update user stories based on feedback

## 7. Planning Game

### Initial Planning Session (Day 1)
1. **Story Writing** (30 minutes)
   - Break down requirements into user stories
   - Write acceptance criteria

2. **Estimation** (20 minutes)
   - Use story points (1, 2, 3, 5, 8)
   - Team consensus on estimates

3. **Prioritization** (15 minutes)
   - Customer ranks stories by business value
   - Technical dependencies considered

4. **Sprint Planning** (15 minutes)
   - Assign stories to daily sprints
   - Identify risks and dependencies

### Daily Planning (5 minutes)
- Review yesterday's progress
- Plan today's work
- Identify any blockers

## 8. Daily Stand-up Meeting

### Format (10-15 minutes max)
Each team member answers:
1. What did I complete yesterday?
2. What will I work on today?
3. What blockers do I have?

### Best Practices
- Stand up (literally) to keep it short
- Focus on work, not personal updates
- Identify blockers but don't solve them in standup
- Follow up on blockers after the meeting

## Tools and Setup

### Development Tools
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
\`\`\`

### Recommended VS Code Extensions
- Live Share (for pair programming)
- Jest (for testing)
- ESLint (for code quality)
- Prettier (for code formatting)
- GitLens (for Git integration)

### Project Structure
\`\`\`
taskeasy/
├── app/                 # Next.js app directory
├── components/          # React components
├── __tests__/          # Test files
├── docs/               # Documentation
├── .github/workflows/  # CI/CD configuration
└── README.md           # Project overview

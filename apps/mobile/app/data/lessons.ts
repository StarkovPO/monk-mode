export interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'foundation' | 'stages' | 'obstacles' | 'reference';
}

export const lessons: Lesson[] = [
  // Foundation Category
  {
    id: '1',
    title: 'What is Anapanasati?',
    summary: 'Course philosophy and objectives',
    category: 'foundation',
    content: `# What is Anapanasati?

The "Direct Contact" course is a rigorous, 8-week practical program designed to establish a direct link between the practitioner and the present moment. Based on the practice of Anapanasati (Mindfulness of Breathing), the course aims to quiet the intrusive noise of the mind to achieve a state of profound peace and clarity.

## The Central Methodology

The development of the "nothing to do" skill—a deceptively difficult ability to stop following automatic thoughts and reactions. When the internal bustle and habitual restlessness are silenced through intentional slowing down, several "blessed states" naturally emerge:

- **Clear Understanding**: A sharp, undistorted perception of reality
- **Happiness**: A sense of well-being independent of external conditions
- **Creative Energy**: The revitalization of mental and physical resources
- **Loving-Kindness**: A natural orientation of care toward oneself and others

## The Two Contracts

Success in this course is predicated on two formal internal agreements:

### Daily Practice Contract
- **Frequency**: Practice every single day for the full 8-week duration
- **Duration**: Begin with 15 minutes daily. Increase the session by 1 minute each day until reaching a minimum of 30 minutes
- **The Makeup Rule**: If a day is missed due to force majeure, perform a double session the following day

### Balance of Effort
Meditation requires a "zealous and diligent" investment of energy into every single second of awareness. Find the narrow path between the "lazy laxity" of a slouching posture and the "excessive tension" that overstimulates the mind.`,
  },
  {
    id: '2',
    title: 'Posture and Physical Setup',
    summary: 'Sitting positions, spine alignment, and physical framework',
    category: 'foundation',
    content: `# Posture and Physical Setup

A stable physical posture provides the physiological foundation for mental alertness. Sitting is the preferred mode, acting as the "middle way" between the lethargy of lying down and the distractions of standing.

## Sitting Positions

### Chair (Beginner)
- **Base**: Feet flat on floor
- **Legs**: Uncrossed; back away from the backrest
- **Best for**: Beginners, those with knee/hip issues

### Burmese (Intermediate)
- **Base**: Meditation pillow (Zafu)
- **Legs**: Calves parallel on the floor; heels not overlapping
- **Best for**: Intermediate practitioners

### Siddhasana (Subjective)
- **Base**: Meditation pillow (Zafu)
- **Legs**: One heel at the groin; other foot tucked into the overlap
- **Note**: Often perceived as advanced, but many find it provides superior beauty, symmetry, and stability

## Step-by-Step Alignment

1. **Spine**: Maintain a straight back with a slight natural curve in the lower back (facilitated by sitting on the front edge of the pillow)

2. **Shoulders**: Roll the shoulders back slightly, then relax them downward, allowing the body to "hang" from the spinal column

3. **Head**: Imagine a cord pulling the crown upward. Slightly tuck the chin as if gazing at the ground two to three meters away

4. **Eyes**: Closed to internalize the focus

## Environmental Setup

- **Dedicated Corner**: A specific area used only for spiritual practice
- **Physical Support**: High-quality meditation mat and pillow (Zafu/Half-moon)
- **Spiritual Symbols**: Statues, images, or symbols personally meaningful
- **Scent**: Very faint, non-intrusive incense
- **Lighting**: Low lighting or dedicated night lamp
- **Timer**: Digital timer or app with gentle gong sound`,
  },
  {
    id: '3',
    title: 'Hand Mudras',
    summary: 'Dhyana and Bhumisparsa mudras explained',
    category: 'foundation',
    content: `# Hand Mudras

Hand positions (mudras) are symbolic gestures that help focus the mind and embody specific qualities during meditation.

## Dhyana Mudra (Contemplation)

**Position**: Right palm on left palm, thumbs lightly touching to form a triangle

**Symbolism**: Represents the harmony of clarity, peace, and love

**When to use**: During concentration practices, when seeking inner peace and contemplation

**Benefits**:
- Creates a closed energy circuit
- Symbolizes the union of wisdom and compassion
- Helps maintain focus on the breath

## Bhumisparsa Mudra (Calling the Earth)

**Position**: Hands resting on knees, elbows slightly out

**Symbolism**: "Claiming the earth as witness" - taking up space without aggression, unfolding the self to its natural scales

**When to use**: When you need grounding, when working with strong emotions, when establishing presence

**Benefits**:
- Grounds energy downward
- Opens the chest and shoulders
- Creates a sense of stability and rootedness
- Symbolizes being witnessed by the earth itself

## Choosing Your Mudra

Both mudras are valid for Anapanasati practice. Choose based on:
- **Dhyana**: When you want to cultivate inner stillness and concentration
- **Bhumisparsa**: When you need grounding and presence

You may also alternate between sessions or even within a single session if your needs change.`,
  },

  // Stages Category
  {
    id: '4',
    title: 'Stage 1 - Entering Meditation',
    summary: 'The 4-step entry: slowing, scanning, investigating, letting go',
    category: 'stages',
    content: `# Stage 1: Entering Meditation

Before beginning the formal practice, every session must start with this transition sequence (10 seconds to 2 minutes).

## Step 1: Slowing and Posture

Close the eyes, straighten the spine, and consciously decelerate the mind's tempo. Commit to a "gentle effort of stillness."

## Step 2: Scanning

Observe the "panorama of consciousness" through the six senses without verbalization. Use the eyes as the starting point:

1. **Sight**: Observe the colors and forms shifting behind closed eyelids
2. **Hearing**: Sounds or the "sound of silence"
3. **Smell/Taste**: Any present scents or tastes
4. **Touch**: Pressure of clothing, contact with the floor, or temperature
5. **Mind**: The movement of thoughts, emotions, or urges

## Step 3: Investigation

Analyze the dominant "mood." Identify if you are currently:
- Agitated
- Lethargic
- Impatient

Locate specific "islands of tension" in the body.

## Step 4: Letting Go

Explicitly declare meditation as your "most important task." Drop concerns of the past or future and center attention in the "center of consciousness"—the breath.

## Why This Matters

This entry sequence is not optional. It:
- Signals to your nervous system that meditation is beginning
- Helps you assess your starting state
- Creates a clean break from daily activities
- Establishes the breath as your anchor point`,
  },
  {
    id: '5',
    title: 'Stage 2 - Establishing Clear Comprehension',
    summary: 'Breath counting sequences and mental labeling',
    category: 'stages',
    content: `# Stage 2: Establishing Clear Comprehension

This stage utilizes cognitive anchors to stabilize the mind and identify the breath's location in the upper respiratory tract.

## The Counting Sequence

Count in this specific order:
1. 1 to 10
2. 9 to 2
3. 3 to 8
4. 7 to 4
5. 5 to 6
6. End on 5

### Critical Technical Metric

If awareness is broken for more than 2 seconds by an external or internal distraction, you must restart the count from the very first sequence (1–10).

This is not punishment—it's training. Each restart strengthens your ability to notice when attention has wandered.

## Labeling Phase

Once counting is stable, mentally label:
- **"In"** during the inhalation
- **"Out"** during the exhalation

Keep the labels simple and consistent. The words are training wheels for awareness.

## Wordless Awareness

After labeling becomes natural, transition into wordless, clear awareness of the sensations of air passing through the nostrils.

Feel:
- The coolness of the in-breath
- The warmth of the out-breath
- The subtle touch of air at the nostrils
- The natural pause between breaths

## Progression

Beginner: Mostly counting (5-7 minutes)
Intermediate: Counting → Labeling → Wordless (7-10 minutes)
Advanced: Quick counting → Extended wordless awareness (10-15 minutes)`,
  },
  {
    id: '6',
    title: 'Stage 3 - Establishing Mindfulness',
    summary: 'Continuous flow observation and "new, new, new" technique',
    category: 'stages',
    content: `# Stage 3: Establishing Mindfulness "In Front of You"

This step focuses on **Sati**, which literally translates to "Memory" or "Remembering." It is the active process of remembering the now without delay.

## The "In Front of You" Technique

**Visualization**: Imagine your experience is a stream or conveyor belt passing directly in front of your eyes.

To establish awareness "in front of you" means keeping your mental "head" straight:
- **Don't look back** at what just passed
- **Don't lean forward** to see what is coming
- **Meet each sensation** (breath, thought, itch) as it arrives on the "belt"
- **Let it go immediately** after it passes

## The "New, New, New" Practice

Silently note to yourself: "new, new, new" as each moment arises.

This reinforces:
- Each breath is a new breath
- Each thought is a new thought
- Each sensation is a new sensation

Nothing is carried over from the previous moment. Everything is fresh.

## Three Aspects of Sati

1. **Clarity**: Understanding the current state without confusion
2. **Synchronicity**: Noticing sensations as they occur, not after
3. **Panoramicity**: Seeing the whole field of experience, not just one point

## Common Mistakes

❌ Trying to hold onto pleasant sensations
❌ Pushing away unpleasant sensations
❌ Getting lost in thoughts about the past or future
❌ Analyzing the meditation while meditating

✅ Simply meet each moment as it arrives
✅ Let each moment go as it passes
✅ Return to "new, new, new" when you notice you've drifted`,
  },
  {
    id: '7',
    title: 'Stage 4 - Observing the Mind',
    summary: 'Big Mind vs small mind, investigation techniques',
    category: 'stages',
    content: `# Stage 4: Observing the Mind

For strong internal reactions (anger, obsessive thoughts, or physical pain), apply this three-part investigative strategy.

## Big Mind vs Small Mind

**Small Mind**: The reactive, emotional, story-making part of consciousness that gets caught up in drama

**Big Mind**: The observing awareness that can witness small mind without being swept away

### Shifting to Big Mind

When you notice a strong reaction:
1. **Step back mentally**: Imagine you're watching yourself from above
2. **Create distance**: "There is anger" instead of "I am angry"
3. **Observe without judgment**: Watch the reaction like you'd watch clouds passing

## Investigation Techniques

### Labeling
Apply clear labels to what you observe:
- "This is not me" (the reaction is not your identity)
- "This is impermanent" (it will pass)
- "This is just a thought" (not reality)
- "This is just a sensation" (not a command)

### Inquiry
Ask yourself:
- Where in my body do I feel this?
- What is the actual sensation (heat, tightness, pressure)?
- What story is my mind telling about this?
- Is this story true?

### Loving-Kindness Response

If the reaction is particularly strong or painful:
1. Place your hand on your heart
2. Silently say: "May I be at peace"
3. Breathe compassion toward yourself
4. Remember: This is difficult, and you're doing your best

## When to Use This Stage

- When anger, fear, or sadness arises
- When obsessive thoughts loop
- When physical pain demands attention
- When you feel stuck or contracted

Don't force this stage. If your mind is calm, stay with the breath.`,
  },
  {
    id: '8',
    title: 'Stage 5 - Establishing Equanimity',
    summary: 'The "brake pedal" - letting go of craving',
    category: 'stages',
    content: `# Stage 5: Establishing Equanimity

Equanimity is the "brake pedal" of meditation—the ability to let go of craving and rest in what is.

## What is Equanimity?

**Not**: Indifference, numbness, or not caring
**Is**: Balanced acceptance, non-reactivity, inner peace regardless of circumstances

Equanimity means:
- Not pushing away unpleasant experiences
- Not grasping at pleasant experiences
- Resting in the middle, balanced and aware

## The Brake Pedal Technique

Imagine your mind has a brake pedal. When you notice yourself:
- Wanting the meditation to be different
- Wishing for a better breath
- Trying to force concentration
- Resisting what's happening

**Press the brake pedal**: Let go of the craving. Stop trying to get somewhere.

## Practical Application

### When Pleasant Sensations Arise
- Notice them
- Enjoy them
- Don't try to make them stay
- Let them pass naturally

### When Unpleasant Sensations Arise
- Notice them
- Don't try to make them leave
- Observe with curiosity
- Let them pass naturally

### When Neutral Sensations Arise
- Notice them
- Don't judge them as boring
- Appreciate the peace of neutrality
- Let them be

## The Paradox

The more you let go of wanting meditation to be a certain way, the deeper and more peaceful it becomes.

Stop trying to get somewhere. You're already here.

## Signs of Equanimity

- Breath feels effortless
- Mind is spacious and calm
- Reactions arise but don't stick
- Sense of "everything is okay as it is"
- Deep peace and contentment`,
  },
  {
    id: '9',
    title: 'Stage 6 - Establishing Concentration',
    summary: 'The "gas pedal" - gathering mind fully on breath',
    category: 'stages',
    content: `# Stage 6: Establishing Concentration

Concentration is the "gas pedal" of meditation—the ability to gather the mind completely around a single object (the breath).

## What is Concentration?

**Not**: Forcing, straining, or gripping
**Is**: Gentle, continuous attention that naturally deepens

True concentration feels:
- Effortless (like water flowing downhill)
- Stable (like a candle flame in a windless room)
- Bright (clear and vivid awareness)
- Unified (mind and breath become one)

## The Gas Pedal Technique

After establishing equanimity (brake pedal), you can softly press the "gas pedal":
- Gather attention more fully on the breath
- Track each phase without gaps
- Let the mind settle into the breath completely

**Important**: This is a soft, gentle pressure. If you force it, you'll create tension and lose equanimity.

## Complete Breath Tracking

Track every phase of the breath cycle:

1. **Inhale**: Feel the air entering from beginning to end
2. **Pause**: Notice the natural gap at the top
3. **Exhale**: Feel the air leaving from beginning to end
4. **Pause**: Notice the natural gap at the bottom

No gaps in awareness. The mind stays with the breath continuously.

## Deepening Concentration

As concentration deepens, you may notice:
- Breath becomes very subtle and refined
- Sense of body may fade
- Time seems to disappear
- Deep peace and joy arise
- Mind becomes very bright and clear

## Common Obstacles

**Dullness**: Mind becomes foggy or sleepy
- Solution: Sit up straighter, open eyes briefly, take a few deep breaths

**Restlessness**: Mind becomes agitated or scattered
- Solution: Return to equanimity (brake pedal), then gently re-engage

**Forcing**: Trying too hard to concentrate
- Solution: Relax, let go, allow concentration to develop naturally

## The Balance

Concentration requires both:
- **Relaxation** (equanimity/brake pedal)
- **Engagement** (concentration/gas pedal)

Too much brake = dullness
Too much gas = tension
Perfect balance = deep, stable, joyful concentration`,
  },

  // Obstacles Category
  {
    id: '10',
    title: 'Overcoming Agitation',
    summary: 'Renewal of resolve and phase-based commitment',
    category: 'obstacles',
    content: `# Overcoming Agitation & Worry

When the mind is restless, scattered, or worried, use these specific techniques to anchor the drifting attention.

## What is Agitation?

Agitation manifests as:
- Mind jumping from thought to thought
- Inability to stay with the breath for even one cycle
- Feeling restless or anxious
- Constant planning or worrying
- Physical fidgeting or discomfort

## Renewal of Resolve Technique

Instead of trying to force the whole meditation to be calm, commit to much smaller windows:

### Phase-Based Resolve

**Step 1**: Commit to following exactly ONE inhalation from beginning to end, including the pause

**Step 2**: When that's complete, commit to following ONE exhalation from beginning to end, including the pause

**Step 3**: Repeat, one phase at a time

This breaks the meditation into manageable pieces. You're not trying to meditate for 15 minutes—you're just trying to follow this one breath.

### Second-by-Second Resolve

If the mind is extremely restless:

**Commit to just ONE SECOND of focus at a time**

Count: "One... Two... Three..." staying present for each second

Repeat this for several minutes until the agitation subsides

## Additional Techniques

### Counting with Emphasis
Return to the basic counting sequence (1-10, 9-2, etc.) and count more deliberately, even out loud if needed

### Physical Grounding
- Feel your sit bones pressing into the cushion
- Notice the weight of your hands
- Feel your feet on the floor
- This grounds scattered energy

### Labeling the Agitation
Simply note: "Agitation... agitation... agitation..."

This creates distance from the experience and often reduces its intensity

### Acceptance
Sometimes the best approach is to accept: "The mind is agitated right now. That's okay. I'll just sit with this."

Fighting agitation often makes it worse.

## When to Use These Techniques

Use renewal of resolve when:
- You can't complete even one full breath cycle
- Mind is very scattered
- You're feeling overwhelmed
- You need to rebuild basic stability

## The Paradox

The more you accept the agitation and work with it gently (rather than fighting it), the faster it tends to settle.`,
  },
  {
    id: '11',
    title: 'Overcoming Lethargy',
    summary: 'Physical and breath stimulation techniques',
    category: 'obstacles',
    content: `# Overcoming Lethargy & Dullness

If the mind "falls asleep" or loses its edge, apply physical and respiratory stimulation to sharpen awareness.

## What is Lethargy?

Lethargy manifests as:
- Mind becoming foggy or unclear
- Drowsiness or sleepiness
- Losing track of the breath
- Head nodding forward
- Awareness becoming dim or dull
- Feeling heavy or sluggish

## Physical Stimulation Techniques

### Ear Rubbing
Rub the earlobes firmly to generate heat. The ears have many acupressure points that stimulate alertness.

**How**: Pinch earlobes between thumb and forefinger, rub vigorously for 30 seconds

### Arm Rubbing
Rub the arms from elbow to wrist with pressure, creating friction and heat.

**How**: Use opposite hand to firmly rub from elbow down to wrist, both arms, 10-15 times each

### Face Splashing
Splash the face with cold water (if available during break)

**How**: Cup hands with cold water, splash face 3-5 times, pat dry

### Posture Adjustment
- Sit up straighter
- Roll shoulders back
- Lift the crown of the head
- Open eyes briefly (30 seconds)

## Breath Stimulation Techniques

### Rapid Breathing (Hyperventilation)
Perform a series of rapid breaths lasting less than one second each

**How**:
1. Take 10-15 quick, shallow breaths through the nose
2. Return to normal breathing
3. Notice the increased alertness

**Caution**: Don't overdo this—stop if you feel dizzy

### Breath Holding
Hold a deep breath for as long as possible to sharpen perception and accelerate the heart rate

**How**:
1. Take a deep breath in
2. Hold for 20-40 seconds (or as long as comfortable)
3. Exhale slowly
4. Return to normal breathing
5. Notice the heightened awareness

### Deep Breathing
Take 5-10 very deep, full breaths to oxygenate the brain

**How**:
1. Inhale deeply through nose (count to 4)
2. Hold briefly (count to 2)
3. Exhale fully through nose (count to 6)
4. Repeat 5-10 times

## Preventive Measures

### Before Meditation
- Don't meditate immediately after eating
- Ensure you're well-rested
- Meditate at times when you're naturally alert
- Drink water before sitting

### During Meditation
- Keep the room cool rather than warm
- Sit in a well-lit area
- Maintain strong posture
- Open eyes if drowsiness persists

## When Lethargy is Chronic

If you consistently experience lethargy:
- Adjust your meditation time (try morning instead of evening)
- Check your sleep quality
- Evaluate your diet
- Consider if you're genuinely tired and need rest

Sometimes the body is telling you it needs sleep, not meditation.

## The Balance

Use these techniques when needed, but don't create so much stimulation that you become agitated. The goal is alert, calm awareness—not hyperactive energy.`,
  },

  // Reference Category
  {
    id: '12',
    title: 'Glossary of Terms',
    summary: 'Key meditation concepts defined in plain language',
    category: 'reference',
    content: `# Glossary of Meditation Terms

## Anapanasati
**Literal**: "Mindfulness of breathing" (Pali language)
**Meaning**: A meditation technique focused on observing the natural breath as an anchor for developing awareness, concentration, and insight
**In practice**: The foundation of this 8-week course

## Big Mind
**Meaning**: The observing, spacious awareness that can witness thoughts and emotions without being swept away by them
**Opposite**: Small mind (the reactive, story-making part of consciousness)
**In practice**: "Step back into Big Mind" means creating distance from your reactions and observing them with curiosity rather than identification

## Equanimity
**Literal**: "Even-mindedness" or balance
**Meaning**: The quality of remaining calm and balanced regardless of whether experiences are pleasant, unpleasant, or neutral
**Not**: Indifference or not caring
**Is**: Wise, balanced acceptance
**In practice**: The "brake pedal" - letting go of craving for things to be different than they are

## Sati
**Literal**: "Memory" or "remembering" (Pali)
**Meaning**: The active process of remembering the present moment; continuous awareness
**In practice**: "Mindfulness in front of you" - meeting each moment as it arrives without looking back or leaning forward

## Non-Attachment
**Meaning**: The ability to experience things fully without clinging to pleasant experiences or pushing away unpleasant ones
**Not**: Not caring or being emotionally distant
**Is**: Experiencing fully while letting go
**In practice**: Enjoying pleasant sensations without trying to make them stay; observing unpleasant sensations without trying to make them leave

## Reaction
**Meaning**: The automatic, habitual response of the mind to experiences (usually involving craving or aversion)
**Examples**: 
- Wanting a pleasant sensation to continue
- Wanting an unpleasant sensation to stop
- Getting lost in thoughts about past or future
**In practice**: The object of investigation in Stage 4 (Observing the Mind)

## Small Mind
**Meaning**: The reactive, emotional, story-making part of consciousness that gets caught up in drama and identifies with thoughts and emotions
**Opposite**: Big Mind (observing awareness)
**In practice**: When you're lost in worry, anger, or obsessive thinking, you're in small mind

## Concentration (Samadhi)
**Meaning**: The unification of mind around a single object (the breath); stable, continuous attention
**Quality**: Effortless, bright, stable, unified
**In practice**: The "gas pedal" - gently gathering attention more fully on the breath

## Mudra
**Meaning**: Symbolic hand gesture used in meditation
**Purpose**: Focus the mind, embody specific qualities, complete energy circuits
**Examples**: Dhyana mudra (contemplation), Bhumisparsa mudra (earth-touching)

## The Six Senses
**Meaning**: The traditional Buddhist enumeration of sensory experience
**List**:
1. Sight (visual)
2. Hearing (auditory)
3. Smell (olfactory)
4. Taste (gustatory)
5. Touch (tactile)
6. Mind (mental phenomena - thoughts, emotions, memories)

**In practice**: Used in the scanning phase of entering meditation

## Zafu
**Meaning**: Traditional round meditation cushion
**Purpose**: Elevates the hips above the knees, allowing the spine to maintain its natural curve
**Alternatives**: Half-moon cushion, meditation bench, folded blankets

## The Brake Pedal
**Meaning**: Metaphor for equanimity - letting go of craving
**In practice**: When you notice yourself wanting the meditation to be different, "press the brake" and let go of that wanting

## The Gas Pedal
**Meaning**: Metaphor for concentration - gathering attention more fully
**In practice**: After establishing equanimity, gently "press the gas" to deepen focus on the breath
**Caution**: Must be soft and gentle, not forced`,
  },
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

export const getLessonsByCategory = (category: Lesson['category']): Lesson[] => {
  return lessons.filter((lesson) => lesson.category === category);
};

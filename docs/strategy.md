# Hacking Strategy

Note that I'm still a newbie at BitBurner. The strategy I'm implementing here (as of 2022-02-27) is:

- Determine available servers, cores, and ram
- Sort systems by:
  - Home
  - Cores
  - RAM
- For each hackable target:
  - Use available cores+RAM for all below calculations
  - Determine time to weaken from min+5 to min
  - Determine time to grow from 50% to 100%
    - Include estimation of security increase and re-weakening
  - Determine time to hack from 100% to 50%
    - Include estimation of security increase and re-weakening
  - Use total time and total profits to calculate return-per-second (RPS)
- Sort hackables by RPS

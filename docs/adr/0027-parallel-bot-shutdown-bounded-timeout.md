# Parallel grammY shutdown with bounded waits

Stopping the multiplexed Dedicated steering bots issues parallel grammY teardown invocations capped by bounded waits so CTRL+C exits quickly on Windows laptops yet still attempts polite long-polling closure before escalating to `process.exit`. Pure hard exits were rejected—they risk orphaned offset acknowledgements during rapid restarts—but strictly sequential teardown was deemed needless latency when Telegram tolerates concurrently stopped fetchers absent shared mutable session state.

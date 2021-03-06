// Copyright 2018 The Nomulus Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package google.registry.ui.server.registrar;


import static google.registry.request.RequestParameters.extractOptionalParameter;
import static google.registry.request.RequestParameters.extractRequiredParameter;

import dagger.Module;
import dagger.Provides;
import google.registry.request.Parameter;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;

/** Dagger module for the Registrar Console parameters. */
@Module
public final class RegistrarConsoleModule {

  static final String PARAM_CLIENT_ID = "clientId";

  @Provides
  @Parameter(PARAM_CLIENT_ID)
  static Optional<String> provideOptionalClientId(HttpServletRequest req) {
    return extractOptionalParameter(req, PARAM_CLIENT_ID);
  }

  @Provides
  @Parameter(PARAM_CLIENT_ID)
  static String provideClientId(HttpServletRequest req) {
    return extractRequiredParameter(req, PARAM_CLIENT_ID);
  }
}
